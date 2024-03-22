import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { loginSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/db/query/user";

export const authConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          if (user.role !== "admin") return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    })
  ],
} satisfies NextAuthConfig;