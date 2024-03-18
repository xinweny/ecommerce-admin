"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

import { loginSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) return { error: "Email does not exist." };

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
      name: user.firstName,
    });

    return { error: `Confirmation email sent to ${verificationToken.email}. Please verify your email address.` };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: `Welcome back, ${user.firstName}!` };
  } catch (error) {
    if (error instanceof AuthError) return error.type === "CredentialsSignin"
      ? {
        error: "Invalid credentials.",
        status: 400,
      }
      : { error: "Something went wrong." };

    throw error;
  }
};