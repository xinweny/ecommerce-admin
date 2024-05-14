import { ProductCardList } from "@/components/shared/product-card";

import { getFeaturedProducts } from "@/db/query/product";

interface FeaturedProductsDisplayProps {
  categoryId: number;
}

export async function FeaturedProductsDisplay({
  categoryId,
}: FeaturedProductsDisplayProps) {
  const featuredProducts = await getFeaturedProducts({
    filter: { product: { categoryId } },
    pagination: { limit: 10 },
  });

  return (
    <ProductCardList title="Bestsellers" products={featuredProducts} />
  );
}