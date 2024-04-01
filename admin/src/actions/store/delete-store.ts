"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { currentUser } from "@/lib/auth";

export const deleteStore = async (storeId: number) => {
  try {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized", status: 401 };

    const store = await db.store.delete({
        where: {
          id: storeId,
          userId: user.id,
        },
      });

    if (!store) return { error: "Store not found." };

    revalidatePath("/dashboard");

    return { success: `${store.name} store deleted.` };
  } catch (error) {
    return { error: "Something went wrong. Make sure you delete all products and categories in this store first." };
  }
};