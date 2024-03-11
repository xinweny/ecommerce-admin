import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { UserRole } from "@prisma/client";

import { db } from "@/lib/db";

import authConfig from "./auth.config";

import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    signIn: async ({ user }) => {
      // const existingUser = await getUserById(user.id as string);

      // if (!existingUser || !existingUser.emailVerified) return false;

      return true;
    },
    session: async ({ session, token }) => {
      if (!session.user) return session;

      if (token.sub) session.user.id = token.sub;

      if (token.role) session.user.role = token.role as UserRole;

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});