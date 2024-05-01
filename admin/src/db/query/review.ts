import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const reviewIncludeArgs = Prisma.validator<Prisma.ReviewDefaultArgs>()({
  include: {
    product: { select: { id: true, name: true } },
    user: { select: { id: true, firstName: true, lastName: true }},
  },
});

const reviewGroupByArgs = Prisma.validator<Prisma.ReviewGroupByArgs>()({
  by: ["productId"],
  _count: true,
  _avg: { rating: true },
});

export type AdminReview = Prisma.ReviewGetPayload<typeof reviewIncludeArgs>;

export const getQueriedReviews = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const productItems = await db.review.findMany({
    ...reviewIncludeArgs,
    ...where(filter),
    ...paginate(pagination),
    ...orderBy(sort),
  });

  return productItems;
});