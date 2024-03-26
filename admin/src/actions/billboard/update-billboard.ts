"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { extractPublicId } from "cloudinary-build-url";

import { cloudinary } from "@/lib/cloudinary";

import { updateBillboardSchema, type UpdateBillboardSchema } from "@/schemas/billboard";

import { getBillboardById } from "@/db/query/billboard";

export const updateBillboard = async (billboardId: string, values: UpdateBillboardSchema) => {
  try {
    const validatedFields = updateBillboardSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const billboard = await getBillboardById(billboardId);

    if (!billboard) return { error: "Billboard not found." };

    const { imageUrl } = billboard;
      await Promise.all([
        (async () => {
          if (values.imageUrl !== imageUrl) await cloudinary.uploader.destroy(extractPublicId(imageUrl));

          return;
        })(),
        db.billboard.update({
          where: { id: billboardId },
          data: { ...values },
        }),
      ]);

    revalidatePath(`/dashboard/${billboard.storeId}/billboards`);

    return { success: "Billboard updated." };
  } catch {
    return { error: "Something went wrong." };
  }
};