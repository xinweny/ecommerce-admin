import crypto from "crypto";
import { v4 as uuid } from "uuid";

import { db } from "../db/client";

import { getVerificationTokenByEmail } from "@/actions/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/actions/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/actions/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + (3600 * 1000)); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + (3600 * 1000)); // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  const passwordResetToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + (300 * 1000)); // 5 min

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) await db.twoFactorToken.delete({
    where: { id: existingToken.id },
  });

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};