import { redirect } from "next/navigation";

import {
  getCategoryBySlug,
  getSubcategories,
} from "@/db/query/category";
import { getProducts } from "@/db/query/product";

import { CategoryBillboard } from "./_components/category-billboard";
import { CategoryFilter } from "./_components/category-filter";

interface CategoryPageProps {
  params: { categorySlug: string };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function CategoryPage({
  params: {
    categorySlug,
  },
  searchParams: {
    categoryIds,
    inStock,
    priceRange,
  },
}: CategoryPageProps) {
  const category = await getCategoryBySlug(categorySlug);

  if (!category) redirect("/");

  const fSearchParams = {
    categoryIds: (categoryIds
      ? JSON.parse(categoryIds).map((id: string) => +id)
      : undefined) as number[] | undefined,
    inStock: inStock === "true",
    priceRange: (priceRange
      ? JSON.parse(priceRange)
      : undefined) as [number, number] | undefined,
  };

  const products = await getProducts({
    filter: {
      ...(categoryIds && {
        categoryId: { in: fSearchParams.categoryIds },
      }),
      ...(fSearchParams.inStock && {
        productItems: { some: { stock: { gt: 0 } } },
      }),
      ...(fSearchParams.priceRange && {
        productItems: {
          some: {
            AND: [
              { price: { gte: fSearchParams.priceRange[0] } },
              { price: { lte: fSearchParams.priceRange[1] } },
            ],
          },
        },
      })
    },
  });

  return (
    <div>
      <CategoryBillboard category={category} />
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 px-4 sm:px-6 lg:px-8">
        <CategoryFilter category={category} />
      </div>
    </div>
  );
}