"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface ProductNavbarProps {
  productId: number;
};

export function ProductNavbarDesktop({
  productId,
}: ProductNavbarProps) {
  const pathname = usePathname();

  const links = [
    { href: "", label: "Overview" },
    { href: "/skus", label: "SKUs" },
    { href: "/orders", label: "Orders" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <nav className="flex gap-8 overflow-x-auto">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={`/products/${productId}${href}`}
        >
          <span
            className={cn(
              "text-sm font-semibold",
              pathname === `/products/${productId}${href}`
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}