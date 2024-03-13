"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/reset.schema";

import { getUserByEmail } from "@/data/user";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid email." };

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: "Email not found." };

  return { success: "Reset email sent!" };
};