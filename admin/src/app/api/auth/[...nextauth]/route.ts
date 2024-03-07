import NextAuth from "next-auth/next";
import Email from "next-auth/providers/email";

const handler = NextAuth({
  providers: [
    Email({

    }),
  ],
});

export {
  handler as GET,
  handler as POST,
};