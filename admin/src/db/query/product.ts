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
  include: {},
});

const productItemGroupByArgs = Prisma.validator<Prisma.ProductItemGroupByArgs>()({
  by: ["productId"],
  _count: true,
  _sum: { stock: true },
});

export type AdminProduct = Prisma.ProductGetPayload<typeof productIncludeArgs> & {
  productItems: Prisma.GetProductItemGroupByPayload<typeof productItemGroupByArgs> | null,
};

const productAttributeValuesIncludeArgs = Prisma.validator<Prisma.ProductAttributeValueDefaultArgs>()({
  include: {
    attributeValue: {
      include: {
        attribute: true,
      },
    },
  },
});

const productItemIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: {
    productAttributeValues: {
      ...productAttributeValuesIncludeArgs,
    },
  },
});

export type ProductItemWithAttributes = Prisma.ProductItemGetPayload<typeof productItemIncludeArgs>;

const fullProductIncludeArgs = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    productItems: {
      include: {
        images: true,
        ...productAttributeValuesIncludeArgs,
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
  
    return products.map((product) => ({
      ...product,
      productItems: productItems.find(item => item.productId === product.id) || null,
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

export const getProductAttributes = cache(async () => {
  const productAttributes = await db.attribute.findMany();

  return productAttributes;
});

export const getProductAttributeValues = cache(async(attributeId: number) => {
  const productAttributeValues = await db.attributeValue.findMany({
    where: { attributeId },
  });

  return productAttributeValues;
});