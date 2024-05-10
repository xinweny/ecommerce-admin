import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  bestsellerOrderItemGroupByArgs,
} from "./order";

const featuredProductIncludeArgs = {
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
    select: { price: true, stock: true },
  },
} satisfies Prisma.ProductInclude;

export type FeaturedProductIncludePayload = Prisma.ProductGetPayload<{ include: typeof featuredProductIncludeArgs }>;

export const getFeaturedProductsByCategoryId = cache(async (categoryId: number) => {
  const orderItems = await db.orderItem.groupBy({
    where: { product: { categoryId } },
    ...bestsellerOrderItemGroupByArgs,
    take: 10,
  });

  const productIds = orderItems.map(({ productId }) => productId);

  const products = await db.product.findMany({
    where: { id: { in: productIds } },
    include: featuredProductIncludeArgs,
  });

  return products;
});
