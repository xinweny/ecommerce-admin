"use server";

import { revalidatePath } from "next/cache";
import { extractPublicId } from "cloudinary-build-url";

import { db } from "@/db/client";
import { cloudinary } from "@/lib/cloudinary";

import { productItemSchema, type ProductItemSchema } from "@/schemas/product";

export const updateProductItem = async (productItemId: number, values: ProductItemSchema) => {
  try {
    const validatedFields = productItemSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const { imageUrls, ...productItemValues } = values;

    const productItem = await db.$transaction(async (tx) => {
      const productItem = await db.productItem.update({
        where: { id: productItemId },
        data: { ...productItemValues },
      });

      const images = await tx.productItemImage.findMany({
        where: { productItemId },
      });

      const deletedUrls = images
        .map(image => image.imageUrl)
        .filter(x => !imageUrls.includes(x));

      await Promise.all([
        tx.productItemImage.deleteMany({
          where: { productItemId },
        }),
        ...deletedUrls.map(url => cloudinary.uploader.destroy(extractPublicId(url))),
      ]);

      await tx.productItemImage.createMany({
        data: imageUrls.map(url => ({ productItemId, imageUrl: url })),
      });

      return productItem;
    });

    revalidatePath("/products");

    return {
      data: { productId: productItem.id },
      success: `${productItem.name} updated.`,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};