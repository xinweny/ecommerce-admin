"use client";

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
      <SidebarDesktopHeader>Dashboard</SidebarDesktopHeader>
      <div className="mt-5">
        {links.map(({ href, label, icon }) => (
          <SidebarDesktopLinkButton
            key={href}
            className="mt-1"
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