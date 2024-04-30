import { getQueriedProducts, getProductsCount } from "@/db/query/product";
import { getCategories } from "@/db/query/category";
import { getBrands } from "@/db/query/brand";
import { getSubcategories } from "@/db/query/subcategory";
import { getSeries } from "@/db/query/series";

import { ProductsClient } from "./_components/products-client";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | undefined;
  }
}

export default async function ProductsPage({
  searchParams: {
    id,
    page,
    limit,
    name,
    slug,
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
        slug,
        model,
        category: { name: categoryName },
        subcategory: { name: subcategoryName },
        brand: { name: brandName },
        series: { name: seriesName },
        isArchived,
      },
      filter: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        ...(categoryId && { categoryId: +categoryId }),
        ...(subcategoryId && { subcategoryId: +subcategoryId }),
        ...(brandId && { brandId: +brandId }),
        ...(seriesId && { seriesId: +seriesId }),
      },
    }),
    getProductsCount(),
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