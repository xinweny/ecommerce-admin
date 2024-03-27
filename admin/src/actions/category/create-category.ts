"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { categorySchema, type CategorySchema } from "@/schemas/category";

import { getStoreById } from "@/db/query/store";

export const createCategory = async (storeId: string, values: CategorySchema) => {
  try {
    const validatedFields = categorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const store = await getStoreById(storeId);

    if (!store) return { error: "Store not found." };

    const category = await db.category.create({
      data: {
        storeId,
        ...values,
      },
    });

    revalidatePath(`/dashboard/${storeId}/categories`);

    return { success: `${category.name} category created.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};