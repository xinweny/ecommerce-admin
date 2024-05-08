import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const orderIncludeArgs = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    user: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    },
  },
});

export type OrderIncludePayload = Prisma.OrderGetPayload<typeof orderIncludeArgs>;

export const getQueriedOrders = cache(async (params: DbQueryParams<Prisma.OrderWhereInput>) => {
  const { pagination, sort, filter } = params;

  const orders = await db.order.findMany({
    ...where(filter),
    ...orderBy(sort),
    ...paginate(pagination),
    ...orderIncludeArgs,
  });

  return orders;
});

const orderItemIncludeArgs = Prisma.validator<Prisma.OrderItemDefaultArgs>()({
  include: {
    order: {
      select: {
        id: true,
        orderNumber: true,
        currentStatus: true,
        createdAt: true,
      },
    },
    productItem: {
      select: {
        id: true,
        name: true,
        sku: true,
      },
    },
    product: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});

export type OrderItemIncludePayload = Prisma.OrderItemGetPayload<typeof orderItemIncludeArgs>;

export const getOrdersCount = cache(async (query?: Prisma.OrderWhereInput) => {
  const count = await db.order.count({ where: query });

  return count;
});

export const getQueriedOrderItems = cache(async (params: DbQueryParams<Prisma.OrderItemWhereInput>) => {
  const { pagination, sort, filter } = params;

  const orders = await db.orderItem.findMany({
    ...where(filter),
    ...orderBy(sort),
    ...paginate(pagination),
    ...orderItemIncludeArgs,
  });

  return orders;
});

export const getOrderItemsCount = cache(async (query?: Prisma.OrderItemWhereInput) => {
  const count = await db.orderItem.count({ where: query });

  return count;
});