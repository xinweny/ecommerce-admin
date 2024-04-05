"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  PianoIcon,
  Store,
  Box,
  Boxes,
  Award,
  Settings,
  Image as ImageIcon,
} from "lucide-react";

import {
  SidebarDesktop,
  SidebarDesktopAccordion,
  SidebarDesktopAccordionLink,
  SidebarDesktopHeader,
  SidebarDesktopLinkButton,
} from "@/components/ui/sidebar";

export function Sidebar({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SidebarDesktop {...props}>
      <Link href="/dashboard">
        <SidebarDesktopHeader>Songbird</SidebarDesktopHeader>
      </Link>
      <div className="mt-5 flex flex-col gap-1">
        <SidebarDesktopLinkButton
          label="Dashboard"
          href="/dashboard"
          icon={LayoutDashboard}
        />
        <SidebarDesktopAccordion
          label="Products"
          icon={ShoppingBag}
        >
          <SidebarDesktopAccordionLink
            label="Products"
            href="/products"
            icon={PianoIcon}
          />
          <SidebarDesktopAccordionLink
            label="Brands"
            href="/brands"
            icon={Award}
          />
          <SidebarDesktopAccordionLink
            label="Categories"
            href="/categories"
            icon={Box}
          />
          <SidebarDesktopAccordionLink
            label="Subcategories"
            href="/subcategories"
            icon={Boxes}
          />
        </SidebarDesktopAccordion>
        <SidebarDesktopAccordion
          label="Store"
          icon={Store}
        >
          <SidebarDesktopAccordionLink
            label="Billboards"
            href="/billboards"
            icon={ImageIcon}
          />
          <SidebarDesktopAccordionLink
            label="Settings"
            href="/store"
            icon={Settings}
          />
        </SidebarDesktopAccordion>
      </div>
    </SidebarDesktop>
  );
}