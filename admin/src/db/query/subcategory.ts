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

export type SubcategoryIncludePayload = Prisma.SubcategoryGetPayload<typeof subcategoryIncludeArgs>;

export const getSubcategoryById = cache(async (subcategoryId: number) => {
  const subcategory = await db.subcategory.findUnique({
    where: { id: subcategoryId },
  });

  return subcategory;
});

export const getQueriedSubcategories = cache(async (params: DbQueryParams<Prisma.SubcategoryWhereInput>) => {
  try {
    const { pagination, sort, filter } = params;

    const subcategories = await db.subcategory.findMany({
      ...where(filter),
      ...orderBy(sort),
      ...paginate(pagination),
      ...subcategoryIncludeArgs,
    });
  
    return subcategories;
  } catch (error) {
    return [];
  }
});

export const getSubcategoriesCount = cache(async (query?: Prisma.SubcategoryWhereInput) => {
  const count = await db.subcategory.count({ where: query });

  return count;
});

export const getSubcategories = cache(async () => {
  const subcategories = await db.subcategory.findMany();

  return subcategories;
});

export const getSubcategoriesByCategoryId = cache(async (categoryId: number) => {
  const subcategories = await db.subcategory.findMany({
    where: { categoryId },
  });

  return subcategories;
});