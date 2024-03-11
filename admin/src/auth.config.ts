import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "./schemas";

import { getUserByEmail } from "./data/user";

export default {
  providers: [Credentials({
    authorize: async (credentials) => {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        // TODO: add admin condition

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) return user;
      }

      return null;
    },
  })],
} satisfies NextAuthConfig;