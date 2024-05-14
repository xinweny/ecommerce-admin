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

const productIncludeArgs = {
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

export type ProductIncludePayload = Prisma.ProductGetPayload<{ include: typeof productIncludeArgs }> & {
  reviews: ReviewGroupByPayload | null;
};

export const getProducts = cache(async (params: DbQueryParams<Prisma.ProductWhereInput>) => {
  const { filter, pagination } = params;

  const products = await db.product.findMany({
    ...where(filter),
    include: productIncludeArgs,
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

export const getFeaturedProducts = cache(async (params: DbQueryParams<Prisma.OrderItemWhereInput>) => {
  const { filter, pagination } = params;

  const orderItems = await db.orderItem.groupBy({
    ...where(filter),
    ...bestsellerOrderItemGroupByArgs,
    ...paginate(pagination),
  });

  const productIds = orderItems.map(({ productId }) => productId);

  const products = await getProducts({
    filter: { id: { in: productIds } },
  });

  return products;
});

export const getProductBySlug = cache(async (productSlug: string) => {
  const product = await db.product.findUnique({
    where: { slug: productSlug },
    include: productIncludeArgs,
  });
  
  return product;
});
