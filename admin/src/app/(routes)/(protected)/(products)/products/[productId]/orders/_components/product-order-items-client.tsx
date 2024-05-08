"use client";

import { ProductItemSelectPayload } from "@/db/query/product";
import { OrderItemIncludePayload } from "@/db/query/order";

import { Heading } from "@/components/shared/heading";
import {
  DataTable,
  DataTableQueryForm,
  DataTableFilters,
  DataTableDateRange,
} from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { columns, ProductOrderItemRow } from "./columns";

interface ProductOrderItemsClientProps {
  orderItems: OrderItemIncludePayload[];
  totalCount: number;
  productItems: ProductItemSelectPayload[];
}

export function ProductOrderItemsClient({
  orderItems,
  totalCount,
  productItems,
}: ProductOrderItemsClientProps) {
  const data = orderItems.map(({
    quantity,
    price,
    product,
    productItem,
    order,
  }) => ({
    quantity,
    price,
    product,
    productItem,
    order,
  })) satisfies ProductOrderItemRow[];

  return (
    <div className="space-y-4">
      <Heading title="Order Items" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
        queryForm={<DataTableQueryForm>
          <DataTableFilters
            filters={[{
              label: "SKUs",
              name: "skuId",
              values: productItems.map(({ sku, id }) => ({
                label: sku,
                value: id,
              })),
            }]}
          />
          <DataTableDateRange />
        </DataTableQueryForm>}
      />
    </div>
  );
}