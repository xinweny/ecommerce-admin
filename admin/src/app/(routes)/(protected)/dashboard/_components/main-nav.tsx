"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";


export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { storeId } = useParams();

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
    }
  ];

  if (storeId) routes.push(...[
    {
      href: `/dashboard/${storeId}`,
      label: "Dashboard",
    },
    {
      href: `/dashboard/${storeId}/settings`,
      label: "Settings",
    }
  ]);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === href ? "text =-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}