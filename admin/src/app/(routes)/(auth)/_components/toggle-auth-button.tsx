"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function ToggleAuthButton() {
  const { data: session } = useSession();

  return (
    <button onClick={() => session ? signOut() : signIn()}>
      {session ? "Logout" : "Login"}
    </button>
  );
}