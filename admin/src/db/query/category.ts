import { Prisma } from "@prisma/client";

import { db } from "../client";

const categoryWithProductsCount = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    _count: {
      select: { products: true },
    },
  },
});
export type CategoryWithProductsCount = Prisma.CategoryGetPayload<typeof categoryWithProductsCount>;

export const getCategoryById = async (categoryId: number) => {
  const category = await db.category.findUnique({
    where: { id: categoryId },
  });

  return category;
};

export const getCategoriesWithProductsCount = async () => {
  const categories = await db.category.findMany(categoryWithProductsCount);

  return categories;
};