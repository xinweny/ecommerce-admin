import { db } from "../client";

export const getCategoryById = async (categoryId: string) => {
  const billboard = await db.category.findUnique({
    where: { id: categoryId },
  });

  return billboard;
};

export const getCategoriesByStoreId = async (storeId: string) => {
  const categories = await db.category.findMany({
    where: { storeId },
  });

  return categories;
};