"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
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
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Store",
      href: "/store",
      icon: Store,
    },
  ];

  return (
    <SidebarDesktop {...props}>
      <Link href="/dashboard">
        <SidebarDesktopHeader>Songbird</SidebarDesktopHeader>
      </Link>
      <div className="mt-5 flex flex-col gap-1">
        {links.map(({ href, label, icon }) => (
          <SidebarDesktopLinkButton
            key={href}
            href={href}
            label={label}
            icon={icon}
            isActive={pathname.includes(href)}
          />
        ))}
      </div>
    </SidebarDesktop>
  );
}