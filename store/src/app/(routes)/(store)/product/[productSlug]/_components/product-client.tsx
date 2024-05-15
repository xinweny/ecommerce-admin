"use client";

import { useState } from "react";

import { ProductItemImageGallery } from "./product-item-image-gallery";
import { ProductInfo } from "./product-info";

import { ProductIncludePayload, ProductItemIncludePayload } from "@/db/query/product";

interface ProductClientProps {
  product: ProductIncludePayload;
}

export function ProductClient({
  product,
}: ProductClientProps) {
  const [productItem, setProductItem] = useState<ProductItemIncludePayload>(product.productItems[0]);

  return (
    <div className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <ProductItemImageGallery
        productItem={productItem}
      />
      <ProductInfo
        product={product}
        productItem={productItem}
        setProductItem={setProductItem}
      />
    </div>
  );
}