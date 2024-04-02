import { getBillboards } from "@/db/query/billboard";
import { getCategories } from "@/db/query/category";
import { CategoryClient } from "./_components/category-client";

export default async function CategoriesPage() {
  const [categories, billboards] = await Promise.all([
    getCategories(),
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