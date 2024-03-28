"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNav({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const { storeId } = useParams();

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavLinkItem
          href={storeId ? `/dashboard/${storeId}` : "/dashboard"}
          label="Overview"
        />
        {storeId && (
          <>
            <NavLinkItem
              href={`/dashboard/${storeId}/billboards`}
              label="Billboards"
            />
            <NavLinkItem
              href={`/dashboard/${storeId}/categories`}
              label="Categories"
            />
            <NavDropdownItem
              triggerLabel="Filters"
              prefix={`/dashboard/${storeId}/filters`}
              links={[
                { href: "/brands", label: "Brand" },
                { href: "/subcategories", label: "Subcategory" },
              ]}
            />
            <NavLinkItem
              href={`/dashboard/${storeId}/settings`}
              label="Settings"
            />
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface NavLinkItemProps {
  href: string;
  label: string;
}

function NavLinkItem({
  href,
  label,
}: NavLinkItemProps) {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={cn(
          navigationMenuTriggerStyle(),
          (pathname === href) && "bg-accent"
        )}>
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

interface NavDropdownItemProps {
  triggerLabel: string;
  links: NavLinkItemProps[];
  prefix: string;
}

function NavDropdownItem({
  triggerLabel,
  links,
  prefix,
}: NavDropdownItemProps) {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={pathname.includes(prefix)
          ? "bg-accent"
          : undefined
        }
      >
        {triggerLabel}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        {links.map(({ href, label }) => (
          <NavigationMenuLink
            key={href} 
            className={cn(
              navigationMenuTriggerStyle(),
              "w-full rounded-none justify-start"
            )}
            asChild
          >
            <Link href={`${prefix}${href}`}>
              {label}
            </Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}