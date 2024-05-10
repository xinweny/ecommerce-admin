"use client";

import { logout } from "@/actions/auth/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = async () => {
    await logout();
  };

  return (
    <div
      className="cursor-pointer flex items-center justify-center"
      onClick={onClick}
      role="button"
    >
      {children}
    </div>
  );
}