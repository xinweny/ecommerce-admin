import { redirect } from "next/navigation";

import { Billboard } from "@/components/shared/billboard";
import { CategoryFilter } from "./_components/category-filter";
import { ProductCardList } from "@/components/shared/product-card";
import { ProductPagination } from "@/components/shared/product-pagination";

import { getCategoryBySlug } from "@/db/query/category";
import { getProducts, getProductsCount } from "@/db/query/product";

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
    subcategoryIds,
    brandIds,
    inStock,
    priceRange,
    page,
    limit,
  },
}: CategoryPageProps) {
  const category = await getCategoryBySlug(categorySlug);

  if (!category) redirect("/");

  const fSearchParams = {
    subcategoryIds: (subcategoryIds
      ? JSON.parse(subcategoryIds).map((id: string) => +id)
      : undefined) as number[] | undefined,
    brandIds: (brandIds
        ? JSON.parse(brandIds).map((id: string) => +id)
        : undefined) as number[] | undefined,
    inStock: inStock === "true",
    priceRange: (priceRange
      ? JSON.parse(priceRange)
      : undefined) as [number, number] | undefined,
  };

  const query = {
    categoryId: category.id,
    ...(subcategoryIds && {
      subcategoryId: { in: fSearchParams.subcategoryIds },
    }),
    ...(brandIds && {
      brandId: { in: fSearchParams.brandIds },
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
    }),
  };

  const [products, totalCount] = await Promise.all([
    getProducts({
      filter: query,
      pagination: { page, limit },
    }),
    getProductsCount(query),
  ]);

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
        <div className="lg:col-span-4 flex flex-col gap-8">
          <ProductCardList
            title={category.name}
            products={products}
          />
          <ProductPagination
            className="self-center"
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}