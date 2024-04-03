import { Prisma } from "@prisma/client";
import { cache } from "react";

import { db } from "../client";

import { paginate, Pagination } from "@/lib/db-query";

const categoryWithProductsCount = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    _count: {
      select: { products: true },
    },
  },
});
export type CategoryWithProductsCount = Prisma.CategoryGetPayload<typeof categoryWithProductsCount>;

export const getCategoryById = cache(async (categoryId: number) => {
  const category = await db.category.findUnique({
    where: { id: categoryId },
  });

  return category;
});

export const getCategoriesWithProductsCount = cache(async (pagination: Pagination) => {
  const categories = await db.category.findMany({
    ...categoryWithProductsCount,
    ...paginate(pagination),
  });

  console.log(paginate(pagination));

  return categories;
});

export const getCategoriesCount = cache(async () => {
  const count = await db.category.count();

  return count;
});