"use server";

import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

export const deleteSubcategory = async (subcategoryId: number) => {
  try {
    const subcategory = await db.subcategory.delete({
      where: { id: subcategoryId },
    });

    revalidatePath("/subcategories");

    return { success: `${subcategory.name} subcategory deleted.` };
  } catch {
    return { error: "Something went wrong." };
  }
};