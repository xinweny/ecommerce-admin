import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
    } & DefaultSession["user"]
  }
}