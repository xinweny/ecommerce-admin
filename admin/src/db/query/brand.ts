import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const brandIncludeArgs = Prisma.validator<Prisma.BrandDefaultArgs>()({
  include: {
    _count: {
      select: {
        products: true,
        series: true,
      },
    },
  },
});

export type BrandIncludePayload = Prisma.BrandGetPayload<typeof brandIncludeArgs>;

export const getBrandById = cache(async (brandId: number) => {
  const brand = await db.brand.findUnique({
    where: { id: brandId },
  });

  return brand;
});

export const getBrands = cache(async () => {
  const brands = await db.brand.findMany();

  return brands;
});

export const getQueriedBrands = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const brands = await db.brand.findMany({
      ...where(filter),
      ...brandIncludeArgs,
      ...paginate(pagination),
      ...orderBy(sort),
    });
  
    return brands;
  } catch (error) {
    return [];
  }
});

export const getBrandsCount = cache(async () => {
  const count = await db.brand.count();

  return count;
});