"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { productItemSchema, type ProductItemSchema } from "@/schemas/product";

import { getProductItemImagesByProductItemId } from "@/db/query/product";

export const updateProductItem = async (productItemId: number, values: ProductItemSchema) => {
  try {
    const validatedFields = productItemSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const { imageUrls, ...productItemValues } = values;

    const productItem = await db.productItem.update({
      where: { id: productItemId },
      data: { ...productItemValues },
    });

    const productItemImages = await getProductItemImagesByProductItemId(productItemId);

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