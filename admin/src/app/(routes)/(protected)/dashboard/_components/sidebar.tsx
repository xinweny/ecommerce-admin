"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Image,
  Shapes,
  Store,
} from "lucide-react";

import {
  SidebarDesktop,
  SidebarDesktopHeader,
  SidebarDesktopLinkButton,
} from "@/components/ui/sidebar";

export function Sidebar({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  const links = [
    {
      label: "Overview",
      href: "/dashboard/overview",
      icon: BarChart,
    },
    {
      label: "Billboards",
      href: "/dashboard/billboards",
      icon: Image,
    },
    {
      label: "Categories",
      href: "/dashboard/categories",
      icon: Shapes,
    },
    {
      label: "Store",
      href: "/dashboard/store",
      icon: Store,
    },
  ];

  return (
    <SidebarDesktop {...props}>
      <Link href="/dashboard">
        <SidebarDesktopHeader>Dashboard</SidebarDesktopHeader>
      </Link>
      <div className="mt-5 flex flex-col gap-1">
        {links.map(({ href, label, icon }) => (
          <SidebarDesktopLinkButton
            key={href}
            href={href}
            label={label}
            icon={icon}
            isActive={pathname === href}
          />
        ))}
      </div>
    </SidebarDesktop>
  );
}