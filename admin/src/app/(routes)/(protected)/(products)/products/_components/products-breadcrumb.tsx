"use client";

import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";

export function ProductsBreadcrumb() {
  const links = [
    { href: "/products", label: "Products" },
    { href: "/products/skus", label: "SKUs" },
  ];

  return (
    <BreadcrumbNav links={links} />
  );
}