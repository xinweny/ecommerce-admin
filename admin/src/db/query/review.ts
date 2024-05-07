import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

import { productSelectNameArgs, ProductSelectNamePayload } from "./product";

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

export type ReviewGroupByPayload = Awaited<Prisma.GetReviewGroupByPayload<typeof reviewGroupByArgs>>[0] & {
  product: ProductSelectNamePayload;
};

const reviewAggregateArgs = {
  _count: true,
  _avg: { rating: true },
} satisfies Prisma.ReviewAggregateArgs;

export type ReviewAggregatePayload = Prisma.GetReviewAggregateType<typeof reviewAggregateArgs>;

export type ReviewIncludePayload = Prisma.ReviewGetPayload<typeof reviewIncludeArgs>;

type ReviewGroupByOrderByArgs = {
  orderBy: ({ productId: Prisma.SortOrder })[] & (
    { _avg: { rating: Prisma.SortOrder } } | { _count: Prisma.SortOrder }
  )[];
};

export const getQueriedReviews = cache(async (params: DbQueryParams<Prisma.ReviewWhereInput>) => {
  const { pagination, sort, filter } = params;

  const reviews = await db.review.findMany({
    ...where(filter),
    ...orderBy(sort),
    ...paginate(pagination),
    ...reviewIncludeArgs,
  });

  return reviews;
});

export const getProductReviewAggregate = cache(async (productId: number) => {
  const reviewAggregate = await db.review.aggregate({
    where: { productId },
    ...reviewAggregateArgs,
  });

  return reviewAggregate;
});

export const getReviewsGroupByProduct = cache(async (params: DbQueryParams<Prisma.ReviewWhereInput>): Promise<ReviewGroupByPayload[]> => {
  const { pagination, sort, filter } = params;

  const reviews = await db.review.groupBy({
    ...where(filter),
    ...reviewGroupByArgs,
    ...orderBy(sort) as ReviewGroupByOrderByArgs,
    ...paginate(pagination),
  });

  const products = await db.product.findMany({
    where: { id: { in: reviews.map(review => review.productId) } },
    select: productSelectNameArgs,
  });

  return reviews.map((review, i) => ({
    ...review,
    product: products[i],
  }));
});

export const getReviewsCount = cache(async (query?: Prisma.ReviewWhereInput) => {
  const count = await db.review.count({ where: query });

  return count;
});