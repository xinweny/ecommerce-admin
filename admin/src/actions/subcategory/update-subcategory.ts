"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

import { subcategorySchema, type SubcategorySchema } from "@/schemas/subcategory";

export const updateSubcategory = async (subcategoryId: number, values: SubcategorySchema) => {
  try {
    const validatedFields = subcategorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const subcategory = await db.subcategory.update({
      where: { id: subcategoryId },
      data: { ...values },
    });

    revalidatePath("/categories/subcategories");

    return { success: `${subcategory.name} updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};