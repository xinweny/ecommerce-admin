"use client";

import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";

export function CategoriesBreadcrumb() {
  const links = [
    { href: "/categories", label: "Categories" },
    { href: "/categories/subcategories", label: "Subcategories" },
  ];

  return (
    <BreadcrumbNav links={links} />
  );
}