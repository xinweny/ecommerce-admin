"use client";

import { logout } from "@/actions/auth";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = async () => {
    await logout();
  };

  return (
    <span
      className="cursor-pointer"
      onClick={onClick}
      role="button"
    >
      {children}
    </span>
  );
}