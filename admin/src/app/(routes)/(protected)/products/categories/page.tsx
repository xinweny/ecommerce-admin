import { getBillboards } from "@/db/query/billboard";
import { getCategoriesCount, getCategoriesWithSubcounts } from "@/db/query/category";

import { CategoryClient } from "./_components/category-client";

interface CategoriesPageProps {
  searchParams: {
    page?: string;
    name?: string;
    slug?: string;
    productCount?: string;
    subcategoryCount?: string;
  }
}

export default async function CategoriesPage({
  searchParams: {
    page = "1",
    name,
    slug,
    productCount,
    subcategoryCount,
  },
}: CategoriesPageProps) {
  const [categories, totalCount, billboards] = await Promise.all([
    getCategoriesWithSubcounts({
      pagination: {
        page: +page,
        limit: 20,
      },
      sort: {
        name,
        slug,
        product: { _count: productCount },
        subcategory: { _count: subcategoryCount },
      },
    }),
    getCategoriesCount(),
    getBillboards(),
  ]);

  return (
    <>
      <CategoryClient
        categories={categories}
        billboards={billboards}
        totalCount={totalCount}
      />
    </>
  );
}