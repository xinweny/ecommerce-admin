import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const adminSeries = Prisma.validator<Prisma.SeriesDefaultArgs>()({
  include: {
    brand: true,
    _count: {
      select: {
        products: true,
      },
    },
  },
});

export type AdminSeries = Prisma.SeriesGetPayload<typeof adminSeries>;

export const getSeriesById = cache(async (seriesId: number) => {
  const series = await db.series.findUnique({
    where: { id: seriesId },
  });

  return series;
});

export const getSeries = cache(async () => {
  const series = await db.series.findMany();

  return series;
});

export const getQueriedSeries = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const categories = await db.category.findMany({
      ...where(filter),
      ...adminSeries,
      ...paginate(pagination),
      ...orderBy(sort),
    });
  
    return categories;
  } catch (error) {
    return [];
  }
});

export const getSeriesCount = cache(async () => {
  const count = await db.series.count();

  return count;
});