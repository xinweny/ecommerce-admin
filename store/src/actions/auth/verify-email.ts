"use server";

import { db } from "@/db/client";

import { getUserByEmail } from "@/db/query/user";
import { getVerificationTokenByToken } from "@/db/query/verification-token";

export const verifyEmail = async (token?: string | null) => {
  if (!token) return { error: "Missing token." };

  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) return { error: "Token does not exist." };

  if (new Date() > new Date(verificationToken.expires)) return { error: "Token has expired." };

  const user = await getUserByEmail(verificationToken.email);

  if (!user) return { error: "Email does not exist." };

  await Promise.all([
    db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: verificationToken.email,
      },
    }),
    db.verificationToken.delete({
      where: { id: verificationToken.id },
    })
  ]);

  return { success: "Email verified!" };
};