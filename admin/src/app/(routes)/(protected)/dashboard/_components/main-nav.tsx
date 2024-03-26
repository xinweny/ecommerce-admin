"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { useIsMounted } from "@/hooks";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNav() {
  const { storeId } = useParams();
  
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <NavigationMenu className="ml-4">
      <NavigationMenuList>
        <NavLinkItem
          href={storeId ? `/dashboard/${storeId}` : "/dashboard"}
          label="Overview"
        />
        {storeId && (
          <>
            <NavLinkItem
              href={`/dashboard/${storeId}/display`}
              label="Display"
            />
            <NavDropdownItem
              triggerLabel="Filters"
              prefix={`/dashboard/${storeId}/filters`}
              links={[
                { href: "/category", label: "Category" },
                { href: "/brand", label: "Brand" },
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
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

interface NavDropdownItemProps {
  triggerLabel: string;
  links: NavLinkItemProps[];
  prefix?: string;
}

function NavDropdownItem({
  triggerLabel,
  links,
  prefix,
}: NavDropdownItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{triggerLabel}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div>
          {links.map(({ href, label }) => (
            <NavigationMenuLink
              key={href} 
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href={prefix ? `${prefix}${href}` : href}>
                {label}
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}