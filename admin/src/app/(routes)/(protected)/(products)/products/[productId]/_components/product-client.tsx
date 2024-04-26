"use client";

import { Product } from "@prisma/client";
import { ProductItemWithImages } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { ProductItemClient } from "./product-item-client";

interface ProductClientProps {
  product: Product;
  productItems: ProductItemWithImages[];
}

export function ProductClient({
  product,
  productItems,
}: ProductClientProps) {
  return (
    <div className="space-y-4">
      <Heading title={product.name} />
      <Separator />
      <ProductItemClient
        product={product}
        productItems={productItems}
      />
    </div>
  );
}