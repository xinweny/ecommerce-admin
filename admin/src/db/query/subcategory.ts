import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import {
  where,
  paginate,
  orderBy,
  DbQueryParams,
} from "@/lib/db-query";

const subcategoryIncludeArgs = Prisma.validator<Prisma.SubcategoryDefaultArgs>()({
  include: {
    category: true,
    _count: {
      select: { products: true },
    },
  },
});

export type AdminSubcategory = Prisma.SubcategoryGetPayload<typeof subcategoryIncludeArgs>;

export const getSubcategoryById = cache(async (subcategoryId: number) => {
  const subcategory = await db.subcategory.findUnique({
    where: { id: subcategoryId },
  });

  return subcategory;
});

export const getQueriedSubcategories = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, filter } = params;

    const subcategories = await db.subcategory.findMany({
      ...where(filter),
      ...subcategoryIncludeArgs,
      ...paginate(pagination),
      ...orderBy(sort),
    });
  
    return subcategories;
  } catch (error) {
    return [];
  }
});

export const getSubcategoriesCount = cache(async () => {
  const count = await db.subcategory.count();

  return count;
});