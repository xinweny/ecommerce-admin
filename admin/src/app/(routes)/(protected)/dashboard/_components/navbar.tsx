"use client";

import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/theme/mode-toggle";

export function Navbar() {
  return (
    <div className="flex h-16 items-center px-4">
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}