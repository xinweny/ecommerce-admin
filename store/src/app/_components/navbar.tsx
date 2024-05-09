"use client";

import { useCurrentUser } from "@/hooks";

import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";

export function Navbar() {
  const user = useCurrentUser();

  return (
    <div className="border-b flex align-center justify-between p-4">
      <nav className="">

      </nav>
      <div>
        {user
          ? <LoginButton>Login</LoginButton>
          : <LogoutButton>Logout</LogoutButton>
        }
      </div>
    </div>
  );
}