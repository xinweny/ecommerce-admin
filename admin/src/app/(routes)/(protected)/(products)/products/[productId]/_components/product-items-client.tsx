"use client";

import { Plus } from "lucide-react";
import { Product } from "@prisma/client";

import { AdminProductItem } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import { AddProductItemFormModal } from "./add-product-item-form-modal";

interface ProductItemsClientProps {
  product: Product;
  productItems: AdminProductItem[];
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
        <AddProductItemFormModal />
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