import { Prisma } from "@prisma/client";

import { getQueriedProducts, getProductsCount } from "@/db/query/product";
import { getCategories } from "@/db/query/category";
import { getBrands } from "@/db/query/brand";
import { getSubcategories } from "@/db/query/subcategory";
import { getSeries } from "@/db/query/series";

import { ProductsClient } from "./_components/products-client";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default async function ProductsPage({
  searchParams: {
    id,
    page,
    limit,
    name,
    model,
    categoryName,
    subcategoryName,
    brandName,
    seriesName,
    query,
    categoryId,
    subcategoryId,
    brandId,
    seriesId,
    isArchived,
  },
}: ProductsPageProps) {
  const filter = {
    name: {
      contains: query,
      mode: Prisma.QueryMode.insensitive,
    },
    ...(categoryId && { categoryId: +categoryId }),
    ...(subcategoryId && { subcategoryId: +subcategoryId }),
    ...(brandId && { brandId: +brandId }),
    ...(seriesId && { seriesId: +seriesId }),
  };

  const [
    products,
    totalCount,
    categories,
    subcategories,
    brands,
    series,
  ] = await Promise.all([
    getQueriedProducts({
      pagination: { page, limit },
      sort: {
        id,
        name,
        model,
        category: { name: categoryName },
        subcategory: { name: subcategoryName },
        brand: { name: brandName },
        series: { name: seriesName },
        isArchived,
      },
      filter,
    }),
    getProductsCount(filter),
    getCategories(),
    getSubcategories(),
    getBrands(),
    getSeries(),
  ]);

  return (
    <ProductsClient
      products={products}
      totalCount={totalCount}
      filters={{
        categories,
        subcategories,
        brands,
        series,
      }}
    />
  );
}