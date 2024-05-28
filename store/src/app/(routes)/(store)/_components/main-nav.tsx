"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";

import { useIsMounted, useCart, useCurrentUser } from "@/hooks";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";

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
            pathname === `/category${href}` ? "text-black" : "text-slate-500",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function NavbarActions() {
  const isMounted = useIsMounted();
  const user = useCurrentUser();

  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-x-4">
      {user
        ? (
          <LogoutButton>
            <span className="text-sm">Logout</span>
          </LogoutButton>
        )
        : (
          <LoginButton>
            <span className="text-sm">Login</span>
          </LoginButton>
        )
      }
      <Link href="/cart">
        <Button className="rounded-full px-4 py-2">
          <ShoppingBag size={20} />
          <span className="ml-2 text-sm font-medium text-white">
            {cart.items.length}
          </span>
        </Button>
      </Link>
    </div>    
  );
}