import { redirect } from "next/navigation";

import { getCategoryBySlug } from "@/db/query/category";

import { CategoryBillboard } from "./_components/category-billboard";

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

  return (
    <>
      <CategoryBillboard category={category} />
    </>
  );
}