import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const billboardIncludeArgs = Prisma.validator<Prisma.BillboardDefaultArgs>()({
  include: {
    _count: {
      select: {
        categories: true,
      },
    },
  },
});

export type BillboardIncludePayload = Prisma.BillboardGetPayload<typeof billboardIncludeArgs>;

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

export const getBillboardsCount = cache(async (query?: Prisma.BillboardWhereInput) => {
  const count = await db.billboard.count({ where: query });

  return count;
});

export const getQueriedBillboards = cache(async (params: DbQueryParams<Prisma.BillboardWhereInput>) => {
  try {
    const { pagination, sort, filter } = params;

    const billboards = await db.billboard.findMany({
      ...where(filter),
      ...orderBy(sort),
      ...paginate(pagination),
      ...billboardIncludeArgs,
    });
  
    return billboards;
  } catch (error) {
    return [];
  }
});