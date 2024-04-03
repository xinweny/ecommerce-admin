import { cache } from "react";

import { getBillboards } from "@/db/query/billboard";
import { getCategoriesCount, getCategoriesWithProductsCount } from "@/db/query/category";
import { CategoryClient } from "./_components/category-client";

interface CategoriesPageProps {
  searchParams: {
    page?: string;
  }
}

export default async function CategoriesPage({
  searchParams: { page = "1" },
}: CategoriesPageProps) {
  const [categories, totalCount, billboards] = await Promise.all([
    getCategoriesWithProductsCount({
      page: Number(page),
      limit: 20,
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