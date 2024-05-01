"use client";

import Link from "next/link";
import { Product } from "@prisma/client";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface ProductNavbarProps {
  product: Product;
};

export function ProductNavbarDesktop({
  product,
}: ProductNavbarProps) {
  const pathname = usePathname();

  const { id, name } = product;

  const links = [
    { href: "", label: "Overview" },
    { href: "/skus", label: "SKUs" },
    { href: "/orders", label: "Orders" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <div className="space-y-4 pr-8 pl-0 mr-8 border-r">
      <h2 className="font-bold text-xl">{name}</h2>
      <nav className="flex flex-col gap-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={`/products/${id}${href}`}
          >
            <span
              className={cn(
                "text-sm font-semibold",
                pathname === `/products/${id}${href}`
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}