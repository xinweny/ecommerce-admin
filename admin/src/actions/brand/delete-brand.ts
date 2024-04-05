"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export const deleteBrand = async (brandId: number) => {
  try {
    const brand = await db.brand.delete({
      where: { id: brandId },
    });

    revalidatePath("/brands");

    return { success: `${brand.name} brand deleted.` };
  } catch {
    return { error: "Something went wrong." };
  }
};