"use server";

import * as z from "zod";

import { emailSchema } from "@/schemas/settings";

import { getUserByEmail } from "@/db/query/user";

import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const updateEmail = async (
  values: z.infer<typeof emailSchema>
) => {
  const validatedFields = emailSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const user = await currentUser();

  if (!user) return { error: "Unauthorized", status: 401 };

  const { email } = values;

  if (user.email === email) return { error: "Please enter a different email address." };

  const dbUser = await getUserByEmail(email);

  if (dbUser) return { error: "Email already in use." };

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail({
    name: user.firstName,
    email: verificationToken.email,
    token: verificationToken.token,
  });

  return { success: `Verification email sent to ${verificationToken.email}!` };
};