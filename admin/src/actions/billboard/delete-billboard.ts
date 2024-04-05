"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { extractPublicId } from "cloudinary-build-url";

import { cloudinary } from "@/lib/cloudinary";

import { getBillboardById } from "@/db/query/billboard";

export const deleteBillboard = async (billboardId: number) => {
  try {
    const billboard = await getBillboardById(billboardId);

    if (!billboard) return { error: "Billboard not found." };

    const { imageUrl } = billboard;

    await Promise.all([
      (imageUrl)
        ? cloudinary.uploader.destroy(extractPublicId(imageUrl))
        : Promise.resolve(),
      db.billboard.delete({
        where: { id: billboardId },
      }),
    ]);

    revalidatePath("/billboards");

    return { success: `${billboard.label} deleted.` };
  } catch {
    return { error: "Something went wrong." };
  }
};