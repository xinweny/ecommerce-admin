"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { productSchema, type ProductSchema } from "@/schemas/product";

export const updateProduct = async (productId: number, values: ProductSchema) => {
  try {
    const validatedFields = productSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const product = await db.product.update({
      where: { id: productId },
      data: { ...values },
    });

    revalidatePath("/products");

    return {
      data: { productId: product.id },
      success: `${product.name} updated.`,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};