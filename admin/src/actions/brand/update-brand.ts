"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { extractPublicId } from "cloudinary-build-url";

import { cloudinary } from "@/lib/cloudinary";

import { brandSchema, type BrandSchema } from "@/schemas/brand";

import { getBrandById } from "@/db/query/brand";

export const updateBrand = async (brandId: number, values: BrandSchema) => {
  try {
    const validatedFields = brandSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const brand = await getBrandById(brandId);

    if (!brand) return { error: "Billboard not found." };

    const { imageUrl } = brand;

    await Promise.all([
      (imageUrl && (!values.imageUrl || values.imageUrl !== imageUrl))
        ? cloudinary.uploader.destroy(extractPublicId(imageUrl))
        : Promise.resolve(),
      db.brand.update({
        where: { id: brandId },
        data: { ...values },
      }),
    ]);

    const updatedBrand = await db.brand.update({
      where: { id: brandId },
      data: { ...values },
    });

    revalidatePath("/brand");

    return { success: `${updatedBrand.name} updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};