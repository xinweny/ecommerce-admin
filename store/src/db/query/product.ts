import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  orderBy,
  paginate,
  DbQueryParams,
} from "@/lib/db-query";

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
    where: { isArchived: false },
    include: { images: true },
  },
} satisfies Prisma.ProductInclude;

export type ProductIncludePayload = Prisma.ProductGetPayload<{ include: typeof productIncludeArgs }> & {
  reviews: ReviewGroupByPayload | null;
};

const productItemIncludeArgs = {
  images: true,
} satisfies Prisma.ProductItemInclude;

export type ProductItemIncludePayload = Prisma.ProductItemGetPayload<{ include: typeof productItemIncludeArgs }>;

export const getProducts = cache(async (params: DbQueryParams<Prisma.ProductWhereInput>): Promise<ProductIncludePayload[]> => {
  const { filter, pagination } = params;

  const products = await db.product.findMany({
    ...where({
      ...filter,
      isArchived: false,
    }),
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

export const getProductBySlug = cache(async (productSlug: string) => {
  const product = await db.product.findUnique({
    where: { slug: productSlug },
    include: productIncludeArgs,
  });

  if (!product) return null;

  const reviewAggregate = await db.review.aggregate({
    where: { product: { slug: productSlug } },
    _avg: { rating: true },
    _count: true,
  });
  
  return {
    ...product,
    reviews: reviewAggregate as ReviewGroupByPayload,
  };
});

export const getProductItemsPriceRange = cache(async (filter: Prisma.ProductItemWhereInput) => {
  const productItemAggregate = await db.productItem.aggregate({
    where: filter,
    _min: { price: true },
    _max: { price: true },
  });

  return productItemAggregate;
})
