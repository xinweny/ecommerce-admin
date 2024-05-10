import Link from "next/link";

import { currentUser } from "@/lib/auth";

import { getCategories } from "@/db/query/category";

import { MainNav, NavbarActions } from "./main-nav";

import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";

export async function Navbar() {
  const [user, categories] = await Promise.all([
    currentUser(),
    getCategories(),
  ]);

  const routes = categories.map(({ slug, name }) => ({
    href: `/${slug}`,
    label: name,
  }));

  return (
    <div className="border-b flex items-center justify-between p-4 h-16">
      <div className="flex items-center">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <span className="font-semibold text-xl">STORE</span>
          </Link>
        </div>
        <MainNav routes={routes} />
      </div>
      <NavbarActions user={user} />
    </div>
  );
}