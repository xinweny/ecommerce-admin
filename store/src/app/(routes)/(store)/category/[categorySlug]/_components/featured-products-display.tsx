import { ProductCard } from "@/components/shared/product-card";

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
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
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