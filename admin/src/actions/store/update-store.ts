"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { currentUser } from "@/lib/auth";

import { updateStoreSchema } from "@/schemas/store";

export const updateStore = async (storeId: string, values: z.infer<typeof updateStoreSchema>) => {
  try {
    const validatedFields = updateStoreSchema.safeParse(values);

    if (!validatedFields) return { error: "Invalid fields." };

    const user = await currentUser();

    if (!user) return { error: "Unauthorized", status: 401 };

    const store = await db.store.update({
      where: {
        id: storeId,
        userId: user.id,
      },
      data: {
        name: values.name,
      },
    });

    if (!store) return { error: "Store not found." };

    revalidatePath(`/dashboard/${store.id}`);

    return { success: "Store updated!" };
  } catch {
    return { error: "Something went wrong." };
  }
};