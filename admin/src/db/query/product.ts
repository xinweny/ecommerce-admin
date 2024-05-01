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

const productItemGroupByArgs = Prisma.validator<Prisma.ProductItemGroupByArgs>()({
  by: ["productId"],
  _count: true,
  _sum: { stock: true },
});

const fullProductItemIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: {
    product: { select: { id: true, name: true } },
    images: true,
  },
});

export type AdminProductItem = Prisma.ProductItemGetPayload<typeof fullProductItemIncludeArgs>;

export type AdminProduct = Prisma.ProductGetPayload<typeof productIncludeArgs> & {
  productItems: Prisma.PickEnumerable<Prisma.ProductItemGroupByOutputType, ["productId"]> & {
    _count: number;
    _sum: { stock: number | null };
  },
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

    const productItems = await db.productItem.groupBy({
      where: {
        productId: { in: productIds },
      },
      ...productItemGroupByArgs,
    });
  
    return products.map((product, i) => ({
      ...product,
      productItems: productItems[i],
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