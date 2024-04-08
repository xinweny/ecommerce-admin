"use client";

import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";

export function BrandsBreadcrumb() {
  const links = [
    { href: "/brands", label: "Brands" },
    {
      label: "Filters",
      dropdown: [
        { href: "/brands/series", label: "Series" },
        { href: "/brands/finishes", label: "Finishes" },
      ],
    },
  ];

  return (
    <BreadcrumbNav links={links} />
  );
}