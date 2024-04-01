import { getBillboardsByStoreId } from "@/db/query/billboard";
import { getCategoriesByStoreId } from "@/db/query/category";
import { CategoryClient } from "./_components/category-client";

interface CategoriesPageProps {
  params: { storeId: string };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { storeId } = params;

  const [categories, billboards] = await Promise.all([
    getCategoriesByStoreId(storeId),
    getBillboardsByStoreId(storeId),
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