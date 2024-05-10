import { getFeaturedProductsByCategoryId } from "@/db/query/product";

interface FeaturedProductsDisplayProps {
  categoryId: number;
}

export async function FeaturedProductsDiplay({
  categoryId,
}: FeaturedProductsDisplayProps) {
  const featuredProducts = await getFeaturedProductsByCategoryId(categoryId);

  return (
    <div>
      <h2>Bestsellers</h2>
      <div></div>
    </div>
  );
}