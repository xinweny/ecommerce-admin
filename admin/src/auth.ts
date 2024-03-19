import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { UserRole } from "@prisma/client";

import { db } from "@/db/client";

import authConfig from "./config/auth";

import { getUserById } from "@/actions/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    signIn: async ({ user }) => {
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