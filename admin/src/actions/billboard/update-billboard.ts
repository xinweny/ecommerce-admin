"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { extractPublicId } from "cloudinary-build-url";

import { cloudinary } from "@/lib/cloudinary";

import { billboardSchema, type BillboardSchema } from "@/schemas/billboard";

import { getBillboardById } from "@/db/query/billboard";

export const updateBillboard = async (billboardId: number, values: BillboardSchema) => {
  try {
    const validatedFields = billboardSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const billboard = await getBillboardById(billboardId);

    if (!billboard) return { error: "Billboard not found." };

    const { imageUrl } = billboard;

    await Promise.all([
      (values.imageUrl !== imageUrl)
        ? cloudinary.uploader.destroy(extractPublicId(imageUrl))
        : Promise.resolve(),
      db.billboard.update({
        where: { id: billboardId },
        data: { ...values },
      }),
    ]);

    revalidatePath(`/billboards/${billboard.id}`);

    return { success: `${billboard.label} updated.` };
  } catch {
    return { error: "Something went wrong." };
  }
};