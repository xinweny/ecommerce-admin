import NextAuth, { type DefaultSession } from "next-auth";

import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      firstName: string;
      lastName: string;
      provider: string | null;
    } & DefaultSession["user"]
  }
}