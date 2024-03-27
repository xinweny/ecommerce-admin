"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

import { categorySchema, type CategorySchema } from "@/schemas/category";

export const updateCategory = async (categoryId: string, values: CategorySchema) => {
  try {
    const validatedFields = categorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const category = await db.category.update({
      where: { id: categoryId },
      data: { ...values },
    });

    revalidatePath(`/dashboard/${category.storeId}/billboards`);

    return { success: `${category.name} updated.` };
  } catch {
    return { error: "Something went wrong." };
  }
};