"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/db/client";

import { resetPasswordSchema } from "@/schemas/auth";

import { getPasswordResetTokenByToken } from "@/db/query/password-reset-token";
import { getUserByEmail } from "@/db/query/user";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>,
  token?: string | null,
) => {
  try {
    if (!token) return { error: "Missing token." };

    const validatedFields = resetPasswordSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields." };

    const { password } = validatedFields.data;

    const passwordResetToken = await getPasswordResetTokenByToken(token);

    if (!passwordResetToken) return { error: "Token does not exist." };

    if (new Date() > new Date(passwordResetToken.expires)) return { error: "Token has expired." };

    const user = await getUserByEmail(passwordResetToken.email);

    if (!user) return { error: "User does not exist." };

    const hashedPassword = await bcrypt.hash(password, 10);

    await Promise.all([
      db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      db.passwordResetToken.delete({
        where: { id: passwordResetToken.id },
      }),
    ]);

    return { success: "Password updated successfully! Please log in again." };
  } catch {
    return { error: "Something went wrong." }
  }
};