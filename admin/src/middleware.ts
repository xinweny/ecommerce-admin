import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@/config/auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/config/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const path = nextUrl.pathname;

  if (path.startsWith(apiAuthPrefix)) return;
  
  if (authRoutes.includes(path)) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      : undefined;
  }

  if (!isLoggedIn && !(publicRoutes.includes(path))) return NextResponse.redirect(new URL("/auth/login", nextUrl));

  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};