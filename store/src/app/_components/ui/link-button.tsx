"use client";

import { useRouter } from "next/navigation";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  options?: NavigateOptions;
}

export function LinkButton({
  href,
  children,
  options,
}: LinkButtonProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => { router.push(href, options); }}
      role="button"
    >
      {children}
    </div>
  );
}