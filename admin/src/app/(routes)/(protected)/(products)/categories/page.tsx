import { getCategoriesCount, getQueriedCategories } from "@/db/query/category";

import { CategoryClient } from "./_components/category-client";

interface CategoriesPageProps {
  searchParams: {
    page?: string;
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
    page = "1",
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
      pagination: {
        page: +page,
        limit: 20,
      },
      sort: {
        name,
        slug,
        product: { _count: productCount },
        subcategory: { _count: subcategoryCount },
        billboard: { label: billboardLabel },
      },
      query,
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