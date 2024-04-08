"use client";

import { usePathname } from "next/navigation";

import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";

export function CategoriesBreadcrumb() {
  const pathname = usePathname();

  const links = [
    { href: "/categories", label: "Categories" },
    { href: "/categories/subcategories", label: "Subcategories" },
  ];

  return (
    <BreadcrumbNav links={links} />
  );
}