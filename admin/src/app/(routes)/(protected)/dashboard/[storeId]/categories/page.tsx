import { getCategoriesByStoreId } from "@/db/query/category";

interface CategoriesPageProps {
  params: { storeId: string };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { storeId } = params;

  const categories = await getCategoriesByStoreId(storeId);

  return (
    <></>
  );
}