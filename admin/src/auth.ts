import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/db/client";

import { authConfig } from "./config/auth";

import { getAdminById } from "@/db/query/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    signIn: async ({ user }) => {
      const admin = await getAdminById(user.id as string);

      if (!admin) return false;

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

      const admin = await getAdminById(token.sub);

      if (!admin) return token;

      token.firstName = admin.firstName;
      token.lastName = admin.lastName;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});