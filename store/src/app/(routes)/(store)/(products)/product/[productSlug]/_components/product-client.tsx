"use client";

import { useState } from "react";

import { ProductItemImageGallery } from "./product-item-image-gallery";
import { ProductInfo } from "./product-info";
import { ProductCategoryBreadcrumb } from "./product-category-breadcrumb";

import { ProductIncludePayload, ProductItemIncludePayload } from "@/db/query/product";

interface ProductClientProps {
  product: ProductIncludePayload;
}

export function ProductClient({
  product,
}: ProductClientProps) {
  const [productItem, setProductItem] = useState<ProductItemIncludePayload>(product.productItems[0]);

  return (
    <div className="py-0 sm:px-6 lg:px-8">
      <ProductCategoryBreadcrumb
        category={product.category}
        subcategory={product.subcategory}
      />
      <div className="mt-4 bg-white lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <ProductItemImageGallery
          productItem={productItem}
        />
        <ProductInfo
          product={product}
          productItem={productItem}
          setProductItem={setProductItem}
        />
      </div>
    </div>
  );
}