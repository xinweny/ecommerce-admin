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
    <div className="space-y-6 px-8">
      <h2 className="font-bold text-2xl">Bestsellers</h2>
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