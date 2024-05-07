"use client";

import { ProductItemIncludePayload } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import { ProductItemRow, columns } from "./columns";

interface ProductItemsClientProps {
  productItems: ProductItemIncludePayload[];
  totalCount: number;
}

export function ProductItemsClient({
  productItems,
  totalCount,
}: ProductItemsClientProps) {
  const data = productItems.map(({
    id,
    name,
    sku,
    stock,
    price,
    images,
    product,
    isArchived,
  }) => {
    return {
      id,
      name,
      sku,
      stock,
      price,
      imageUrls: images.map(image => image.imageUrl),
      product,
      isArchived,
    };
  }) satisfies ProductItemRow[];

  return (
    <div className="space-y-4">
      <Heading title="SKUs" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
      />
    </div>
  );
}