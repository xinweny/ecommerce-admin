"use client";

import { Product } from "@prisma/client";

import { ProductItemIncludePayload } from "@/db/query/product";

import {
  DataTable,
  DataTableQueryForm,
  DataTableSearch,
} from "@/components/ui/data-table";

import { ProductPageCardHeading } from "../../_components/product-page-content";

import { columns, ProductItemRow } from "./columns";
import { AddProductItemFormModal } from "./add-product-item-form-modal";

interface ProductItemsClientProps {
  product: Product;
  productItems: ProductItemIncludePayload[];
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
  })) satisfies ProductItemRow[];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ProductPageCardHeading>SKUs</ProductPageCardHeading>
        <AddProductItemFormModal product={product} />
      </div>
      <DataTable
        data={data}
        columns={columns}
        totalCount={productItems.length}
        queryForm={<DataTableQueryForm>
          <DataTableSearch placeholder="Search SKU number" />
        </DataTableQueryForm>}
      />
    </div>
  );
}