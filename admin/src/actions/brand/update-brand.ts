"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

import { brandSchema, type BrandSchema } from "@/schemas/brand";

export const updateBrand = async (brandId: number, values: BrandSchema) => {
  try {
    const validatedFields = brandSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const brand = await db.brand.update({
      where: { id: brandId },
      data: { ...values },
    });

    revalidatePath("/brand");

    return { success: `${brand.name} updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};