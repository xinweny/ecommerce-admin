import NextAuth from "next-auth/next";
import Email from "next-auth/providers/email";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Email({

    }),
  ],
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};