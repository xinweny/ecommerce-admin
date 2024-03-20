"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { db } from "@/db/client";

import { passwordSchema } from "@/schemas/settings";

import { getUserById } from "@/db/query/user";

import { currentUser } from "@/lib/auth";

export const updatePassword = async (
  values: z.infer<typeof passwordSchema>
) => {
  try {
    const validatedFields = passwordSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const user = await currentUser();

    if (!user) return { error: "Unauthorized", status: 401 };

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) return { error: "Unauthorized", status: 401 };

    if (dbUser.password && typeof values.oldPassword === "string") {
      const isCorrectPassword = await bcrypt.compare(values.oldPassword, dbUser.password);

      if (!isCorrectPassword) return { error: "Password is incorrect." };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    await db.user.update({
      where: { id: dbUser.id },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath("/settings");

    return { success: "Password updated successfully!" };
  } catch {
    return { error: "Someting went wrong." };
  }
};