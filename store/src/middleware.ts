import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@/config/auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiPrefix,
  authRoutes,
} from "@/config/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const path = nextUrl.pathname;

  if (path.startsWith(apiPrefix)) return;
  
  if (authRoutes.includes(path)) return isLoggedIn
    ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    : undefined;

  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};