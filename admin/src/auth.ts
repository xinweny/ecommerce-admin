import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { UserRole } from "@prisma/client";

import { db } from "@/db/client";

import authConfig from "./config/auth";

import { getUserById } from "@/db/query/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    signIn: async ({ user }) => {
      const existingUser = await getUserById(user.id as string);

      if (!existingUser || existingUser.role !== "admin") return false;

      return true;
    },
    session: async ({ session, token }) => {
      if (!session.user) return session;

      session.user.id = token.sub as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.firstName = user.firstName;
      token.lastName = user.lastName;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});