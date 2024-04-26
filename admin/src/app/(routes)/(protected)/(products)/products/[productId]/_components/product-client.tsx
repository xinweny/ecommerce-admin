"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { AdminProductItem, FullProduct } from "@/db/query/product";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { ProductItemsClient } from "./product-items-client";

interface ProductClientProps {
  product: FullProduct;
  productItems: AdminProductItem[];
}

export function ProductClient({
  product,
  productItems,
}: ProductClientProps) {
  const router = useRouter();

  // TODO: display product info
  const {
    name,
    model,
    category,
    subcategory,
    brand,
    series,
    description,
    videoUrl,
  } = product;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Heading title={name} />
        <Button onClick={() => { router.push(`/products/edit?productId=${product.id}`) }}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit Product</span>
        </Button>
      </div>
      <Separator />
      <ProductItemsClient
        product={product}
        productItems={productItems}
      />
    </div>
  );
}