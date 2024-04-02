import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "./button";

export function SidebarDesktop({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside className={cn("w-[270px] max-w-xs h-full", className)} {...props}>
      <div className="px-3 py-4">
        {children}
      </div>
    </aside>
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
}

export function SidebarDesktopButton({
  icon: Icon,
  label,
  className,
  ...props
}: SidebarDesktopButtonProps) {
  return (
    <Button
      className={cn("gap-2 justify-start w-full", className)}
      variant="ghost"
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </Button>
  );
}