"use client";

import {
  LucideIcon,
  BarChart,
} from "lucide-react";
import Link from "next/link";

import {
  SidebarDesktop,
  SidebarDesktopButton,
} from "@/components/ui/sidebar";


interface SidebarItems {
  links: {
    label: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

export function Sidebar({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const sidebarItems = {
    links: [
      {
        label: "Overview",
        href: "/dashboard/overview",
        icon: BarChart,
      }
    ],
  } as SidebarItems;

  return (
    <SidebarDesktop {...props}>
      <div className="mt-5">
        {sidebarItems.links.map(({ href, label, icon }) => (
          <Link key={href} href={href}>
            <SidebarDesktopButton
              label={label}
              icon={icon}
            />
          </Link>
        ))}
      </div>
    </SidebarDesktop>
  );
}