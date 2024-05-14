import { redirect } from "next/navigation";

import { getCategoryBySlug } from "@/db/query/category";

import { CategoryBillboard } from "./_components/category-billboard";
import { FeaturedProductsDisplay } from "./_components/featured-products-display";

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
      <FeaturedProductsDisplay categoryId={category.id} />
    </>
  );
}