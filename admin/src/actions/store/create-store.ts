"use server";

import * as z from "zod";

import { db } from "@/db/client";

import { currentUser } from "@/lib/auth";

import { createStoreSchema } from "@/schemas/store";

export const createStore = async (values: z.infer<typeof createStoreSchema>) => {
  try {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized", status: 401 };

    const validatedFields = createStoreSchema.safeParse(values);

    if (!validatedFields) return { error: "Invalid fields." };

    const store = await db.store.create({
        data: {
          name: values.name,
          userId: user.id as string,
        },
      });

    return {
      data: { storeId: store.id },
      success: `${store.name} store created.`,
    };
  } catch {
    return { error: "Something went wrong." };
  }
};