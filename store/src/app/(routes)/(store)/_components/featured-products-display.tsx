import { ProductCardList } from "@/components/shared/product-card";

import { getProducts } from "@/db/query/product";

export async function FeaturedProductsDisplay() {
  const featuredProducts = await getProducts({
    filter: { isFeatured: true },
    sort: { updatedAt: "desc" },
    pagination: { limit: 10 },
  });

  return (
    <ProductCardList
      title="Featured Products"
      products={featuredProducts}
    />
  );
}