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

  if (nextUrl.pathname.startsWith(apiAuthPrefix)) return;
  
  if (authRoutes.includes(nextUrl.pathname)) return isLoggedIn
    ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    : undefined;

  if (!isLoggedIn && !(publicRoutes.includes(nextUrl.pathname))) return NextResponse.redirect(new URL("/login", nextUrl));

  return;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};