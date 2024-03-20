"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/db/client";

import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

import { loginSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/db/query/user";
import { getTwoFactorTokenByEmail } from "@/db/query/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/db/query/two-factor-confirmation";

import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const { email, password, twoFactorCode } = validatedFields.data;

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

  if (user.isTwoFactorEnabled && user.email) {
    if (twoFactorCode) {
      const twoFactorToken = await getTwoFactorTokenByEmail(user.email);

      if (!twoFactorToken || twoFactorToken.token !== twoFactorCode) return { error: "Invalid code." };

      if (new Date(twoFactorToken.expires) < new Date()) return { error: "Code has expired." };

      const deleteTwoFactorConfirmation = async () => {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);

        if (twoFactorConfirmation) await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      };

      await Promise.all([
        db.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        }),
        deleteTwoFactorConfirmation(),
      ]);

      await db.twoFactorConfirmation.create({
        data: { userId: user.id },
      });

      return { success: `Welcome back, ${user.firstName}!` };
    } else {
      const twoFactorToken = await generateTwoFactorToken(user.email);

      await sendTwoFactorTokenEmail({
        name: user.firstName,
        email: twoFactorToken.email,
        token: twoFactorToken.token,
      });

      return { data: { isTwoFactor: true } };
    }
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