"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
}

export function LoginButton({
  children,
}: LoginButtonProps) {
  const router = useRouter();

  return (
    <div
      className="hover:cursor-pointer flex items-center justify-center"
      onClick={() => { router.push("/login"); }}
      role="button"
    >
      {children}
    </div>
  );
}