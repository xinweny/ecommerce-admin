import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const productIncludeArgs = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    brand: {
      select: { id: true, name: true },
    },
    series: {
      select: { id: true, name: true },
    },
    category: {
      select: { id: true, name: true },
    },
    subcategory: {
      select: { id: true, name: true },
    },
  },
});

const reviewGroupByArgs = {
  by: "productId",
  _count: true,
  _avg: { rating: true },
} satisfies Prisma.ReviewGroupByArgs;

type ReviewGroupByPayload = Awaited<Prisma.GetReviewGroupByPayload<typeof reviewGroupByArgs>>;

const productItemGroupByArgs = {
  by: "productId",
  _count: true,
  _sum: { stock: true },
} satisfies Prisma.ProductItemGroupByArgs;

type ProductItemGroupByPayload = Awaited<Prisma.GetProductItemGroupByPayload<typeof productItemGroupByArgs>>;

const fullProductItemIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: {
    product: { select: { id: true, name: true } },
    images: true,
  },
});

export type AdminProductItem = Prisma.ProductItemGetPayload<typeof fullProductItemIncludeArgs>;

export type AdminProduct = Prisma.ProductGetPayload<typeof productIncludeArgs> & {
  productItems: ProductItemGroupByPayload[0];
  reviews: ReviewGroupByPayload[0] | undefined;
};

export type FullProduct = Prisma.ProductGetPayload<typeof productIncludeArgs>;

export const getProductById = cache(async (productId: number) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    ...productIncludeArgs,
  });

  return product;
});

export const getQueriedProducts = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const products = await db.product.findMany({
      ...productIncludeArgs,
      ...where(filter),
      ...orderBy(sort),
      ...paginate(pagination),
    });

    const productIds = products.map(product => product.id);

    const [productItems, reviews] = await Promise.all([
      db.productItem.groupBy({
        where: { productId: { in: productIds } },
        ...productItemGroupByArgs,
      }).then(res => res.reduce((acc, next) => ({
        ...acc,
        [next.productId]: next,
      }), {} as { [key: number]: ProductItemGroupByPayload[0] })),
      db.review.groupBy({
        where: { productId: { in: productIds } },
        ...reviewGroupByArgs,
      }).then(res => res.reduce((acc, next) => ({
        ...acc,
        [next.productId]: next,
      }), {} as { [key: number]: ReviewGroupByPayload[0] })),
    ]);
    console.log(productItems);
  
    return products.map(product => ({
      ...product,
      productItems: productItems[product.id],
      reviews: reviews[product.id],
    }));
  } catch (error) {
    return [];
  }
});

export const getProductsCount = cache(async () => {
  const count = await db.product.count();

  return count;
});

export const getProductItemsCount = cache(async () => {
  const count = await db.productItem.count();

  return count;
});

export const getQueriedProductItems = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const productItems = await db.productItem.findMany({
    ...fullProductItemIncludeArgs,
    ...where(filter),
    ...paginate(pagination),
    ...orderBy(sort),
  });

  return productItems;
});

export const getProductItemImagesByProductItemId = cache(async (productItemId: number) => {
  const productItemImages = await db.productItemImage.findMany({
    where: { productItemId },
  });

  return productItemImages;
});