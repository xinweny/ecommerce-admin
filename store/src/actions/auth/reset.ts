"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/data/user";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid email." };

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: "Email not found." };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
  });

  return { success: `Reset password email sent to ${email}.` };
};