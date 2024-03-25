"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { extractPublicId } from "cloudinary-build-url";

import { cloudinary } from "@/lib/cloudinary";

import { upsertBillboardSchema, type UpsertBillboardSchema } from "@/schemas/billboard";

import { getStoreById } from "@/db/query/store";

export const upsertBillboard = async (storeId: string, values: UpsertBillboardSchema) => {
  try {
    const validatedFields = upsertBillboardSchema.safeParse(values);

    if (!validatedFields) return { error: "Invalid fields." };

    const store = await getStoreById(storeId);

    if (!store) return { error: "Store not found." };

    const billboard = await db.billboard.findUnique({
      where: { storeId: store.id },
    });

    if (billboard) {
      const { imageUrl } = billboard;

      await Promise.all([
        (async () => {
          if (!values.imageUrl && imageUrl) await cloudinary.uploader.destroy(extractPublicId(imageUrl));

          return;
        })(),
        db.billboard.update({
          where: { storeId: store.id },
          data: { ...values },
        }),
      ]);
    } else {
      await db.billboard.create({
        data: {
          storeId: store.id,
          ...values,
        },
      });
    }

    revalidatePath(`/dashboard/${store.id}/display`);

    return { success: `${store.name} display updated.` };
  } catch (error) {
    return { error: "Something went wrong." };
  }
};