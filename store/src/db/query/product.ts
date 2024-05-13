import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  DbQueryParams,
} from "@/lib/db-query";

import { bestsellerOrderItemGroupByArgs } from "./order";
import { reviewGroupByArgs, ReviewGroupByPayload } from "./review";

const productsIncludeArgs = {
  category: {
    select: { id: true, name: true, slug: true, },
  },
  subcategory: {
    select: { id: true, name: true, slug: true },
  },
  brand: {
    select: { id: true, name: true, slug: true },
  },
  series: {
    select: { id: true, name: true, slug: true },
  },
  productItems: {
    include: { images: true },
  },
} satisfies Prisma.ProductInclude;

export type ProductsIncludePayload = Prisma.ProductGetPayload<{ include: typeof productsIncludeArgs }> & {
  reviews: ReviewGroupByPayload | null;
};

export const getFeaturedProducts = cache(async (params: DbQueryParams<Prisma.OrderItemWhereInput>) => {
  const { filter, pagination } = params;

  const orderItems = await db.orderItem.groupBy({
    ...where(filter),
    ...bestsellerOrderItemGroupByArgs,
    ...paginate(pagination),
  });

  const productIds = orderItems.map(({ productId }) => productId);

  const products = await db.product.findMany({
    where: {
      categoryId: filter?.product?.categoryId,
      ...(productIds.length > 0 && {
        id: { in: productIds },
      }),
    },
    include: productsIncludeArgs,
    ...paginate(pagination),
  });

  const reviewGroupBy = await db.review.groupBy({
    where: {
      productId: { in: products.map(product => product.id) },
    },
    ...reviewGroupByArgs,
  }).then(res => res.reduce((acc, next) => ({
    ...acc,
    [next.productId]: next,
  }), {} as { [key: number]: ReviewGroupByPayload }));

  return products.map(product => ({
    ...product,
    reviews: reviewGroupBy[product.id] || null,
  }));
});
