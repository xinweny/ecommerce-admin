import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { Route } from "next";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "./button";
import { ScrollArea } from "./scroll-area";

export function SidebarDesktop({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ScrollArea className="w-[270px] max-w-xs overflow-hidden">
      <nav className={cn("p-4 min-h-screen", className)} {...props}>
        {children}
      </nav>
    </ScrollArea>
  );
}

export function SidebarDesktopHeader({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h1 className="mx-3 text-lg font-semibold text-foreground">
      {children}
    </h1>
  );
}

interface SidebarDesktopButtonProps extends ButtonProps {
  icon?: LucideIcon;
  label: string;
  isActive?: boolean;
}

export function SidebarDesktopButton({
  icon: Icon,
  label,
  className,
  isActive,
  ...props
}: SidebarDesktopButtonProps) {
  return (
    <Button
      className={cn(
        "gap-2 justify-start w-full",
        className,
      )}
      variant={isActive ? "default" : "ghost"}
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </Button>
  );
}

interface SidebarDesktopLinkButtonProps extends SidebarDesktopButtonProps {
  href: Route;
}

export function SidebarDesktopLinkButton({
  href,
  label,
  icon,
  ...props
}: SidebarDesktopLinkButtonProps) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <SidebarDesktopButton
        label={label}
        icon={icon}
        {...props}
        isActive={pathname.includes(href)}
      />
    </Link>
  );
}

interface SidebarDesktopAccordionProps {
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function SidebarDesktopAccordion({
  label,
  icon,
  children,
}: SidebarDesktopAccordionProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const Icon = icon;

  return (
    <div>
      <Button
        className="flex items-center justify-between w-full"
        variant="ghost"
        onClick={() => { setIsCollapsed(prev => !prev); }}
      >
        <div className="flex gap-2 justify-start w-full">
          {Icon && <Icon size={20} />}
          <span>{label}</span>
        </div>
        {isCollapsed
          ? <ChevronDown />
          : <ChevronUp />
        }
      </Button>
      {!isCollapsed && (
        <ul className="ml-8 mt-1 flex flex-col gap-1">
          {children}
        </ul>
      )}
    </div>
  );
}

export function SidebarDesktopAccordionLink({
  href,
  label,
  className,
  icon,
  ...props
}: SidebarDesktopLinkButtonProps) {
  return (
    <li>
      <SidebarDesktopLinkButton
        href={href}
        label={label}
        className={className}
        icon={icon}
        {...props}
      />
    </li>
  );
}