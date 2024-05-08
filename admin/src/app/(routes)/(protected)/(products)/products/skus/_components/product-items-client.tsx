"use client";

import { ProductItemIncludePayload } from "@/db/query/product";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";
import {
  DataTable,
  DataTableQueryForm,
  DataTableSearch,
} from "@/components/ui/data-table";

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
        queryForm={<DataTableQueryForm>
          <DataTableSearch placeholder="Search SKU number" />
        </DataTableQueryForm>}
      />
    </div>
  );
}