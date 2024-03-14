import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/db/client";

import authConfig from "./config/auth.config";

import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    session: async ({ session, token }) => {
      if (!session.user) return session;

      if (token.sub) session.user.id = token.sub;

      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.email = token.email as string;
      session.user.provider = token.provider as "string" | null;

      return session;
    },
    jwt: async ({ token, account }) => {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.firstName = user.firstName;
      token.lastName = user.lastName;
      token.email = user.email;
      token.provider = account?.provider || null;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});