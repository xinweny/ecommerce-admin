import { getQueriedProducts, getProductsCount } from "@/db/query/product";

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
  },
}: ProductsPageProps) {
  const [products, totalCount] = await Promise.all([
    getQueriedProducts({
      pagination: { page, limit },
      sort: {
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
      },
    }),
    getProductsCount(),
  ]);

  return (
    <ProductClient
      products={products}
      totalCount={totalCount}
    />
  );
}