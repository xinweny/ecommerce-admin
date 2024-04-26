"use client";

import { Plus } from "lucide-react";
import { Product } from "@prisma/client";

import { ProductItemWithImages } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

interface ProductItemsClientProps {
  product: Product;
  productItems: ProductItemWithImages[];
}

export function ProductItemsClient({
  product,
  productItems,
}: ProductItemsClientProps) {
  const data = productItems.map(({
    id,
    name,
    sku,
    stock,
    price,
    images,
  }) => ({
    id,
    name,
    sku,
    stock,
    price,
    imageUrls: images.map(image => image.imageUrl),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="SKUs" />
        <Button onClick={() => {
          console.log("TODO: add create product item modal")
        }}>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Product Item</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={productItems.length}
      />
    </div>
  );
}