import { getCategoriesCount, getQueriedCategories } from "@/db/query/category";

import { CategoriesClient } from "./_components/categories-client";

interface CategoriesPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
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
    <CategoriesClient
      categories={categories}
      totalCount={totalCount}
    />
  );
}