"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { userInfoSchema } from "@/schemas/settings";

import { getUserById } from "@/queries/user";

import { currentUser } from "@/lib/auth";

export const updateUserInfo = async (
  values: z.infer<typeof userInfoSchema>
) => {
  const validatedFields = userInfoSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };
  
  const user = await currentUser();

  if (!user) return { error: "Unauthorized", status: 401 };

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) return { error: "Unauthorized", status: 401 };

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      firstName: values.firstName,
      lastName: values.lastName,
    },
  });

  revalidatePath("/settings");

  return { success: "User info updated!" };
};