"use server";

import { extractPublicId } from "cloudinary-build-url";

import { cloudinary } from "@/lib/cloudinary";

import { getBillboardByStoreId } from "@/db/query/billboard";
import { getStoreById } from "@/db/query/store";

export const cleanupBillboardUploads = async (storeId: string) => {
  const store = await getStoreById(storeId);

  if (!store) return { error: "Store not found." };

  const response = await cloudinary.search
    .expression(`folder:ecommerce/stores/${storeId}/billboard`)
    .execute();

  console.log(response);

  let publicIds = response.resources.map((resource: any) => resource.public_id);

  if (publicIds.length === 0) return { success: "Cleanup completed." };

  const billboard = await getBillboardByStoreId(store.id);

  if (billboard?.imageUrl) {
    const billboardPublicId = extractPublicId(billboard.imageUrl) as string;

    publicIds = publicIds.filter((publicId: string) => publicId !== billboardPublicId);
  };

  await Promise.all(publicIds.map(async (publicId: string) => {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch {
      return;
    }
  }));

  return { success: "Cleanup completed." };
}