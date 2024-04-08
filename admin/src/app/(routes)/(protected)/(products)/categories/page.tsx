import { getCategoriesCount, getQueriedCategories } from "@/db/query/category";

import { CategoryClient } from "./_components/category-client";

interface CategoriesPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    slug?: string;
    productCount?: string;
    subcategoryCount?: string;
    billboardLabel?: string;
    query?: string;
  }
}

export default async function CategoriesPage({
  searchParams: {
    id,
    page,
    limit,
    name,
    slug,
    productCount,
    subcategoryCount,
    billboardLabel,
    query,
  },
}: CategoriesPageProps) {
  const [categories, totalCount] = await Promise.all([
    getQueriedCategories({
      pagination: { page, limit },
      sort: {
        id,
        name,
        slug,
        product: { _count: productCount },
        subcategory: { _count: subcategoryCount },
        billboard: { label: billboardLabel },
      },
      filter: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    }),
    getCategoriesCount(),
  ]);

  return (
    <CategoryClient
      categories={categories}
      totalCount={totalCount}
    />
  );
}