import { ProductCard } from "../../../_components/product-card";

import { getFeaturedProducts } from "@/db/query/product";

interface FeaturedProductsDisplayProps {
  categoryId: number;
}

export async function FeaturedProductsDiplay({
  categoryId,
}: FeaturedProductsDisplayProps) {
  const featuredProducts = await getFeaturedProducts({
    filter: { product: { categoryId } },
    pagination: { limit: 10 },
  });

  return (
    <div>
      <h2>Bestsellers</h2>
      <div className="grid">
        {featuredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}