"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { db } from "@/db/client";

import { passwordSchema } from "@/schemas/settings";

import { getUserById } from "@/data/user";

import { currentUser } from "@/lib/auth";

export const updatePassword = async (
  values: z.infer<typeof passwordSchema>
) => {
  const validatedFields = passwordSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const user = await currentUser();

  if (!user) return { error: "Unauthorized", status: 401 };

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized", status: 401 };

  await bcrypt.compare(values.oldPassword, dbUser.password)

  await bcrypt.hash()

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      
    },
  });

  revalidatePath("/settings");

  return { success: "User info updated!" };
};