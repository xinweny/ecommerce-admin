import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import { paginate, orderBy, DbQueryParams } from "@/lib/db-query";

const adminCategory = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    billboard: true,
    _count: {
      select: {
        products: true,
        subcategories: true,
      },
    },
  },
});
export type AdminCategory = Prisma.CategoryGetPayload<typeof adminCategory>;

export const getCategoryById = cache(async (categoryId: number) => {
  const category = await db.category.findUnique({
    where: { id: categoryId },
  });

  return category;
});

export const getQueriedCategories = cache(async (params: DbQueryParams) => {
  try {
    const { pagination, sort, query } = params;

    const categories = await db.category.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      ...adminCategory,
      ...paginate(pagination),
      ...orderBy(sort),
    });
  
    return categories;
  } catch (error) {
    return [];
  }
});

export const getCategoriesCount = cache(async () => {
  const count = await db.category.count();

  return count;
});