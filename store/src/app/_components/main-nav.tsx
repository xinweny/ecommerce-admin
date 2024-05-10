"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface MainNavProps {
  routes: {
    label: string;
    href: string;
  }[];
}

export function MainNav({
  routes,
}: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map(({ label, href }) => (
        <Link
          key={label}
          href={`/category${href}` as Route}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            pathname === `/category${href}` ? "text-black" : "text-neutral-500",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}