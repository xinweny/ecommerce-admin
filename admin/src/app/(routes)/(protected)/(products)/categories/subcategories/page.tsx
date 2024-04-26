import { getQueriedSubcategories, getSubcategoriesCount } from "@/db/query/subcategory";

import { SubcategoriesClient } from "./_components/subcategories-client";

interface SubcategoriesPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    id?: string;
    name?: string;
    slug?: string;
    productCount?: string;
    query?: string;
  }
}

export default async function SubcategoriesPage({
  searchParams: {
    page,
    limit,
    id,
    name,
    slug,
    productCount,
    query,
  },
}: SubcategoriesPageProps) {
  const [subcategories, totalCount] = await Promise.all([
    getQueriedSubcategories({
      pagination: { page, limit },
      sort: {
        id,
        name,
        slug,
        productCount,
      },
      filter: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    }),
    getSubcategoriesCount(),
  ]);

  return (
    <SubcategoriesClient
      subcategories={subcategories}
      totalCount={totalCount}
    />
  );
}