"use client";

import { FullProduct } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { ProductItemCard } from "./product-item-card";

interface ProductClientProps {
  product: FullProduct;
}

export function ProductClient({
  product: {
    name,
    productItems,
  },
}: ProductClientProps) {
  return (
    <div className="space-y-4">
      <Heading title={name} />
      <Separator />
      <Heading title="SKUs" />
      <div>
        {productItems.map(productItem => (
          <ProductItemCard
            key={productItem.id}
            productItem={productItem}
          />
        ))}
      </div>
    </div>
  );
}