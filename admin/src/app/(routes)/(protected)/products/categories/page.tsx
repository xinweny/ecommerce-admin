import { getBillboards } from "@/db/query/billboard";
import { getCategoriesCount, getCategoriesWithProductsCount } from "@/db/query/category";

import { CategoryClient } from "./_components/category-client";

interface CategoriesPageProps {
  searchParams: {
    page?: string;
    name?: string;
    slug?: string;
    productCount?: string;
  }
}

export default async function CategoriesPage({
  searchParams: {
    page = "1",
    name,
    slug,
    productCount,
  },
}: CategoriesPageProps) {
  const [categories, totalCount, billboards] = await Promise.all([
    getCategoriesWithProductsCount({
      pagination: {
        page: +page,
        limit: 20,
      },
      sort: {
        name,
        slug,
        product: { _count: productCount },
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