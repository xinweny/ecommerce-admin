"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { twoFactorSchema } from "@/schemas/settings";

import { getUserById } from "../data/user";

import { currentUser } from "@/lib/auth";

export const updateTwoFactor = async (
  values: z.infer<typeof twoFactorSchema>
) => {
  const validatedFields = twoFactorSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };
  
  const user = await currentUser();

  if (!user) return { error: "Unauthorized", status: 401 };

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized", status: 401 };

  const { isTwoFactorEnabled } = values;

  await db.user.update({
    where: { id: dbUser.id },
    data: { isTwoFactorEnabled: isTwoFactorEnabled },
  });

  revalidatePath("/settings");

  return { success: `2FA ${isTwoFactorEnabled ? "enabled" : "disabled"}.` };
};