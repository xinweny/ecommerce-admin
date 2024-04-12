import { getQueriedProducts, getProductsCount } from "@/db/query/product";
import { getCategories } from "@/db/query/category";
import { getBrands } from "@/db/query/brand";

import { ProductClient } from "./_components/product-client";

interface ProductsPageProps {
  searchParams: {
    id?: string;
    page?: string;
    limit?: string;
    name?: string;
    slug?: string;
    model?: string;
    categoryName?: string;
    subcategoryName?: string;
    brandName?: string;
    seriesName?: string;
    query?: string;
    categoryId?: string;
    subcategoryId?: string;
    brandId?: string;
    seriesId?: string;
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
  },
}: ProductsPageProps) {
  const [
    products,
    totalCount,
    categories,
    brands,
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
    getBrands(),
  ]);

  return (
    <ProductClient
      products={products}
      totalCount={totalCount}
      filters={{
        categories,
        brands,
      }}
    />
  );
}