import { redirect } from "next/navigation";

import { getCategoryBySlug } from "@/db/query/category";
import { getProducts } from "@/db/query/product";

import { Billboard } from "@/components/shared/billboard";
import { CategoryFilter } from "./_components/category-filter";
import { ProductCardList } from "@/components/shared/product-card";

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
    <div className="p-4 sm:p-6 lg:p-8">
      <Billboard
        title={category.name}
        description={category.billboard?.description}
        imageUrl={category.billboard?.imageUrl}
      />
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:gap-x-8 mt-8">
        <div>
          <CategoryFilter category={category} />
        </div>
        <div className="lg:col-span-4">
          <ProductCardList
            title={category.name}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}