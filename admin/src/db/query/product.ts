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

const productItemIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: { images: true },
});

export type AdminProduct = Prisma.ProductGetPayload<typeof productIncludeArgs> & {
  productItems: Prisma.PickEnumerable<Prisma.ProductItemGroupByOutputType, ["productId"]> & {
    _count: number;
    _sum: { stock: number | null };
  },
};

const fullProductIncludeArgs = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    ...productIncludeArgs.include,
    productItems: {
      include: {
        images: true,
      },
    },
  },
});

export type FullProduct = Prisma.ProductGetPayload<typeof fullProductIncludeArgs>;

export const getProductById = cache(async (productId: number) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  return product;
});

export const getQueriedProducts = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const products = await db.product.findMany({
      ...productIncludeArgs,
      ...where(filter),
      ...paginate(pagination),
      ...orderBy(sort),
    });

    const productItems = await db.productItem.groupBy({
      where: {
        productId: {
          in: products.map(product => product.id),
        },
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

export const getFullProductById = cache(async (productId: number) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    ...fullProductIncludeArgs,
  });

  return product;
});

export const getQueriedProductItems = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const productItems = await db.productItem.findMany({
    ...productItemIncludeArgs,
    ...where(filter),
    ...paginate(pagination),
    ...orderBy(sort),
  });

  return productItems;
});