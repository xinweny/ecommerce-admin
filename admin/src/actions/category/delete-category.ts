"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (categoryId: string) => {
  try {
    const category = await db.category.delete({
      where: { id: categoryId },
    });

    revalidatePath(`/dashboard/${category.storeId}/categories`);

    return { success: `${category.name} category deleted.` };
  } catch {
    return { error: "Something went wrong." };
  }
};