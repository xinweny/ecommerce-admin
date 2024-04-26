"use client";

import { Product } from "@prisma/client";
import { ProductItemWithImages } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { ProductItemsClient } from "./product-items-client";

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
      <ProductItemsClient
        product={product}
        productItems={productItems}
      />
    </div>
  );
}