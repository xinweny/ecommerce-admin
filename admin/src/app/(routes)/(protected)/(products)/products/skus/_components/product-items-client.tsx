"use client";

import { AdminProductItem } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { ProductItemRow, columns } from "./columns";

interface ProductItemsClientProps {
  productItems: AdminProductItem[];
}

export function ProductItemsClient({
  productItems,
}: ProductItemsClientProps) {
  const data: ProductItemRow[] = productItems.map(({
    id,
    name,
    sku,
    stock,
    price,
    images,
    product,
  }) => {
    return {
      id,
      name,
      sku,
      stock,
      price,
      imageUrls: images.map(image => image.imageUrl),
      product,
    };
  });

  return (
    <div className="space-y-4">
      <Heading title="SKUs" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={productItems.length}
      />
    </div>
  );
}