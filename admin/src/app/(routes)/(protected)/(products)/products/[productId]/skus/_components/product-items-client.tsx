"use client";

import { Product } from "@prisma/client";

import { AdminProductItem } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
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
    product,
    images,
    isArchived,
  }) => ({
    id,
    name,
    sku,
    stock,
    price,
    product: {
      id: product.id,
      name: product.name,
    },
    images,
    isArchived,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading title="SKUs" />
        <AddProductItemFormModal product={product} />
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