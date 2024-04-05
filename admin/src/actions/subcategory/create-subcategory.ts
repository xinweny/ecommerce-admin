"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { subcategorySchema, type SubcategorySchema } from "@/schemas/subcategory";

export const createSubcategory = async (values: SubcategorySchema) => {
  try {
    const validatedFields = subcategorySchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const category = await db.subcategory.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/subcategories");

    return { success: `${category.name} subcategory created.` };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};