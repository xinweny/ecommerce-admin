"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { currentUser } from "@/lib/auth";

import { storeSchema } from "@/schemas/store";

export const updateStore = async (storeId: number, values: z.infer<typeof storeSchema>) => {
  try {
    const validatedFields = storeSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const user = await currentUser();

    if (!user) return { error: "Unauthorized", status: 401 };

    const store = await db.store.update({
      where: {
        id: storeId,
      },
      data: { ...values },
    });

    if (!store) return { error: "Store not found." };

    revalidatePath("/store");

    return { success: "Store updated!" };
  } catch {
    return { error: "Something went wrong." };
  }
};