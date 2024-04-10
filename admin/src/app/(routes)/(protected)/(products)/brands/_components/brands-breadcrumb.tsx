"use client";

import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";

export function BrandsBreadcrumb() {
  const links = [
    { href: "/brands", label: "Brands" },
    { href: "/brands/series", label: "Series" },
  ];

  return (
    <BreadcrumbNav links={links} />
  );
}