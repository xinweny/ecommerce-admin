import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import { paginate, orderBy, DbQueryParams } from "@/lib/db-query";

const categoryWithSubcounts = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    _count: {
      select: {
        products: true,
        subcategories: true,
      },
    },
  },
});
export type CategoryWithSubcounts = Prisma.CategoryGetPayload<typeof categoryWithSubcounts>;

export const getCategoryById = cache(async (categoryId: number) => {
  const category = await db.category.findUnique({
    where: { id: categoryId },
  });

  return category;
});

export const getCategoriesWithSubcounts = cache(async (params: DbQueryParams) => {
  const { pagination, sort, query } = params;

  const categories = await db.category.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    ...categoryWithSubcounts,
    ...paginate(pagination),
    ...orderBy(sort),
  });

  return categories;
});

export const getCategoriesCount = cache(async () => {
  const count = await db.category.count();

  return count;
});