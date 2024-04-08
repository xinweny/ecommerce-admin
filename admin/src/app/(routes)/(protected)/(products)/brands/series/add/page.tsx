import { getCategories } from "@/db/query/category";

import { CreateSubcategoryForm } from "./_components/create-subcategory-form";

export default async function CreateSubcategoryPage() {
  const categories = await getCategories();

  return (
    <CreateSubcategoryForm
      categories={categories}
    />
  );
}