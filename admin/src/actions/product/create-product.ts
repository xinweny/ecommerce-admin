"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { productSchema, type ProductSchema } from "@/schemas/product";

export const createProduct = async (values: ProductSchema) => {
  try {
    const validatedFields = productSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const { productItems, ...productValues } = values;

    const product = await db.product.create({
      data: {
        ...productValues,
        productItems: {
          create: productItems.map(({ name, sku, price, stock, imageUrls }) => ({
            name,
            sku,
            price,
            stock,
            images: {
              create: imageUrls.map(imageUrl => ({
                imageUrl,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/products");

    return { success: `${product.name} created.` };
  } catch {
    return { error: "Something went wrong." };
  }
};