"use client";

import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";

export function Social() {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        onClick={() => { onClick("google"); }}
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}