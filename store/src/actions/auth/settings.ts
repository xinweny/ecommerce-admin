"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { SettingsSchema } from "@/schemas/settings";

import { getUserById } from "@/data/user";

import { currentUser } from "@/lib/auth";

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized", status: 401 };

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized", status: 401 };

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  revalidatePath("/settings");

  return { success: "User info updated!" };
};