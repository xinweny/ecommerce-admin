import { redirect } from "next/navigation";

import {
  getCategoryBySlug,
  getSubcategories,
} from "@/db/query/category";

import { CategoryBillboard } from "./_components/category-billboard";
import { CategoryFilter } from "./_components/category-filter";

interface CategoryPageProps {
  params: { categorySlug: string };
}

export default async function CategoryPage({
  params: {
    categorySlug,
  },
}: CategoryPageProps) {
  const category = await getCategoryBySlug(categorySlug);

  if (!category) redirect("/");

  const subcategories = await getSubcategories({
    filter: { categoryId: category.id },
  });

  return (
    <div>
      <CategoryBillboard category={category} />
      <CategoryFilter subcategories={subcategories} />
    </div>
  );
}