import { getBillboards } from "@/db/query/billboard";
import { getCategoriesWithProductsCount } from "@/db/query/category";
import { CategoryClient } from "./_components/category-client";

export default async function CategoriesPage() {
  const [categories, billboards] = await Promise.all([
    getCategoriesWithProductsCount(),
    getBillboards(),
  ]);

  return (
    <>
      <CategoryClient
        categories={categories}
        billboards={billboards}
      />
    </>
  );
}