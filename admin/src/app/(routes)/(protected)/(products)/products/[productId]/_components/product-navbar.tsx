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
  const links = [
    { href: "", label: "Overview" },
    { href: "/skus", label: "SKUs" },
    { href: "/orders", label: "Orders" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <nav className="inline-flex gap-2 p-1 overflow-x-auto no-scrollbar border rounded-md bg-secondary w-auto">
      {links.map(({ href, label }) => (
        <ProductNavbarLink
          key={href}
          productId={productId}
          href={href}
          label={label}
        />
      ))}
    </nav>
  );
}

interface ProductNavbarLinkProps {
  href: string;
  label: string;
  productId: number;
}

function ProductNavbarLink({
  href,
  label,
  productId,
}: ProductNavbarLinkProps) {
    const pathname = usePathname();

    const link = `/products/${productId}${href}`;

    const isActive = pathname === link;

    return (
      <Link
        key={href}
        href={`/products/${productId}${href}`}
      >
        <div
          className={cn(
            "px-4 py-1 rounded",
            isActive ? "bg-background" : undefined
          )}
        >
          <span
            className={cn(
              "text-sm font-medium",
              isActive
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {label}
          </span>
        </div>
      </Link>
    );
}