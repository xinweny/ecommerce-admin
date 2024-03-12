"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields." };

  const {
    firstName,
    lastName,
    email,
    password,
  } = validatedFields.data;
  const existingUser = await db.user.findUnique({
    where: { email },
  });

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

  // TODO: Send verification token email

  return { success: "Signed up successfully!" };
};