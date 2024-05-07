import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const orderIncludeArgs = Prisma.validator<Prisma.OrderDefaultArgs>()({});

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

export const getOrdersCount = cache(async (query?: Prisma.OrderWhereInput) => {
  const count = await db.order.count({ where: query });

  return count;
});