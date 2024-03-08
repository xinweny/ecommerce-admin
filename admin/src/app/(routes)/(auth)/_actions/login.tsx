"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const { success } = LoginSchema.safeParse(values);

  return success
    ? { success: "Logged in successfully." }
    : { error: "Invalid fields." };
};