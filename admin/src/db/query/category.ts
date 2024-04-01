import { db } from "../client";

export const getCategoryById = async (categoryId: number) => {
  const billboard = await db.category.findUnique({
    where: { id: categoryId },
  });

  return billboard;
};

export const getCategories = async () => {
  const categories = await db.category.findMany();

  return categories;
};