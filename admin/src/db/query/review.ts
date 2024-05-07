import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

import { productSelectNameArgs } from "./product";

const reviewIncludeArgs = Prisma.validator<Prisma.ReviewDefaultArgs>()({
  include: {
    product: { select: { id: true, name: true } },
    user: { select: { id: true, firstName: true, lastName: true }},
  },
});

const reviewGroupByArgs = {
  by: "productId",
  _count: true,
  _avg: { rating: true },
} satisfies Prisma.ReviewGroupByArgs;

export type ReviewGroupByPayload = Awaited<Prisma.GetReviewGroupByPayload<typeof reviewGroupByArgs>>;

const reviewAggregateArgs = {
  _count: true,
  _avg: { rating: true },
} satisfies Prisma.ReviewAggregateArgs;

export type ReviewAggregatePayload = Prisma.GetReviewAggregateType<typeof reviewAggregateArgs>;

export type ReviewIncludePayload = Prisma.ReviewGetPayload<typeof reviewIncludeArgs>;

export const getQueriedReviews = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const productItems = await db.review.findMany({
    ...where(filter),
    ...orderBy(sort),
    ...paginate(pagination),
    ...reviewIncludeArgs,
  });

  return productItems;
});

export const getProductReviewAggregate = cache(async (productId: number) => {
  const reviewAggregate = await db.review.aggregate({
    where: { productId },
    ...reviewAggregateArgs,
  });

  return reviewAggregate;
});

export const getReviewsGroupByProduct = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const reviews = await db.review.groupBy({
    ...where(filter),
    ...reviewGroupByArgs,
    ...orderBy(sort) as any,
    ...paginate(pagination),
  });

  console.log(reviews);

  return reviews;
});