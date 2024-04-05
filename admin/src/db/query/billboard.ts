import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const adminBillboard = Prisma.validator<Prisma.BillboardDefaultArgs>()({
  include: {
    _count: {
      select: {
        categories: true,
      },
    },
  },
});

export type AdminBillboard = Prisma.BillboardGetPayload<typeof adminBillboard>;

export const getBillboardById = cache(async (billboardId: number) => {
  const billboard = await db.billboard.findUnique({
    where: { id: billboardId },
  });

  return billboard;
});

export const getBillboards = cache(async () => {
  const billboards = await db.billboard.findMany();

  return billboards;
});

export const getBillboardsCount = cache(async () => {
  const count = await db.billboard.count();

  return count;
});

export const getQueriedBillboards = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const billboards = await db.billboard.findMany({
      ...where(filter),
      ...adminBillboard,
      ...paginate(pagination),
      ...orderBy(sort),
    });
  
    return billboards;
  } catch (error) {
    return [];
  }
});