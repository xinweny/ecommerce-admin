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

const productItemWithImagesIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: { images: true },
});

const fullProductItemIncludeArgs = Prisma.validator<Prisma.ProductItemDefaultArgs>()({
  include: {
    product: { select: { id: true, name: true } },
    images: true,
  },
});

const orderItemGroupByArgs = Prisma.validator<Prisma.OrderItemGroupByArgs>()({
  by: ["productItemId"],
  _sum: { quantity: true },
});

export type AdminProductItem = Prisma.ProductItemGetPayload<typeof fullProductItemIncludeArgs> & {
  orderItems: Prisma.PickEnumerable<Prisma.OrderItemGroupByOutputType, ["productItemId"]> & {
    _sum: { quantity: number | null };
  } | null,
};

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
      ...productItemWithImagesIncludeArgs,
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

export const getQueriedProductItems = cache(async (params: DbQueryParams) => {
  const { pagination, sort, filter } = params;

  const productItems = await db.productItem.findMany({
    ...fullProductItemIncludeArgs,
    ...where(filter),
    ...paginate(pagination),
    ...orderBy(sort),
  });

  const orderItems = (await db.orderItem.groupBy({
    where: {
      productItemId: {
        in: productItems.map(productItem => productItem.id),
      },
    },
    ...orderItemGroupByArgs,
  })).reduce((agg, next) => {
    agg[next.productItemId] = next;

    return agg;
  }, {} as {
    [key: number]: Prisma.PickEnumerable<Prisma.OrderItemGroupByOutputType, ["productItemId"]> & {
      _sum: { quantity: number | null };
    };
  });

  return productItems.map(productItem => ({
    ...productItem,
    orderItems: orderItems[productItem.id] || null,
  }));
});

export const getProductItemImagesByProductItemId = cache(async (productItemId: number) => {
  const productItemImages = await db.productItemImage.findMany({
    where: { productItemId },
  });

  return productItemImages;
});