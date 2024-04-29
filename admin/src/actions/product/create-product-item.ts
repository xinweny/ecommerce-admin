"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { productItemSchema, type ProductItemSchema } from "@/schemas/product";

export const createProductItem = async (productId: number, values: ProductItemSchema) => {
  try {
    const validatedFields = productItemSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const { imageUrls, ...productItemValues } = values;

    const productItem = await db.productItem.create({
      data: {
        productId,
        ...productItemValues,
        images: {
          create: imageUrls.map(imageUrl => ({
            imageUrl,
          })),
        },
      },
    });

    revalidatePath(`/products/${productItem.productId}`);

    return {
      success: `${productItem.name} created.`,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};