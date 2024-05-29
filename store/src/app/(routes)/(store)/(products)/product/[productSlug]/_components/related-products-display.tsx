import { Product } from "@prisma/client";

import { ProductCardList } from "@/components/shared/product-card";

import { getProducts } from "@/db/query/product";

interface RelatedProductsDisplayProps {
  product: Product;
}

export async function RelatedProductsDisplay({
  product,
}: RelatedProductsDisplayProps) {
  const relatedProducts = await getProducts({
    filter: {
      AND: [
        { subcategoryId: product.subcategoryId },
        { id: { not: product.id } },
      ],
    },
    pagination: { limit: 5 },
  });

  return (
    <div className="px-6">
      <ProductCardList
        title="Related Items"
        products={relatedProducts}
      />
    </div>
  );
}