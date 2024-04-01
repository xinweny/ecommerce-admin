"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { categorySchema, type CategorySchema } from "@/schemas/category";

export const createCategory = async (values: CategorySchema) => {
  try {
    const validatedFields = categorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const category = await db.category.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard/categories");

    return { success: `${category.name} category created.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};