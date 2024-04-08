"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { brandSchema, type BrandSchema } from "@/schemas/brand";

export const createBrand = async (values: BrandSchema) => {
  try {
    const validatedFields = brandSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const brand = await db.brand.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/brands");

    return { success: `${brand.name} brand created.` };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};