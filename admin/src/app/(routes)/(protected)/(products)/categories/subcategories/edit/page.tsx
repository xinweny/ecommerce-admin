import { redirect } from "next/navigation";

import { getSubcategoryById } from "@/db/query/subcategory";
import { getCategories } from "@/db/query/category";

import { UpdateSubcategoryForm } from "./_components/update-subcategory-form";

interface EditSubcategoryPageProps {
  searchParams: { subcategoryId: string };
}

export default async function EditSubcategoryPage({
  searchParams: { subcategoryId },
}: EditSubcategoryPageProps) {
  const subcategory = await getSubcategoryById(+subcategoryId);

  if (!subcategory) redirect("/categories/subcategories");

  const categories = await getCategories();

  return (
    <UpdateSubcategoryForm
      subcategory={subcategory}
      categories={categories}
    />
  );
}