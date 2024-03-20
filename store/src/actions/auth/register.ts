"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/db/client";

import { registerSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/db/query/user";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const {
    firstName,
    lastName,
    email,
    password,
  } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use." };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token,
    name: firstName,
  });

  return { success: `Confirmation email sent to ${email}!` };
};