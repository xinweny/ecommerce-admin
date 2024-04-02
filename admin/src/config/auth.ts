import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { loginSchema } from "@/schemas/auth";

import { getAdminByEmail } from "@/db/query/user";

export const authConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getAdminByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    })
  ],
} satisfies NextAuthConfig;