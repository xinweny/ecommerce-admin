"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import {
  productSchema,
  type ProductSchema,
  updateArchivedSchema,
  type UpdateArchivedSchema,
} from "@/schemas/product";

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

export const updateProductArchived = async (productId: number, values: UpdateArchivedSchema) => {
  try {
    const validatedFields = updateArchivedSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const product = await db.product.update({
      where: { id: productId },
      data: { ...values },
    });

    revalidatePath(`/products/${productId}`);

    return {
      success: `${product.name} ${product.isArchived ? "archived" : "unarchived"}.`,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};