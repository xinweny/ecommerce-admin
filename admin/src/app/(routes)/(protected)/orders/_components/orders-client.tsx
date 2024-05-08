"use client";

import { OrderStatus } from "@prisma/client";

import { OrderIncludePayload } from "@/db/query/order";

import { Heading } from "@/components/shared/heading";
import {
  DataTable,
  DataTableQueryForm,
  DataTableSearch,
  DataTableFilters,
  DataTableDateRange,
} from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { columns, OrderRow } from "./columns";

interface OrdersClientProps {
  orders: OrderIncludePayload[];
  totalCount: number;
}

export function OrdersClient({
  orders,
  totalCount,
}: OrdersClientProps) {
  const data = orders.map(({
    id,
    total,
    currentStatus,
    createdAt,
    user,
    firstName,
    lastName,
    orderNumber,
  }) => ({
    id,
    orderNumber,
    total,
    currentStatus,
    createdAt,
    user: { id: user.id },
    firstName,
    lastName,
  })) satisfies OrderRow[];

  return (
    <div className="space-y-4">
      <Heading title="Orders" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
        queryForm={<DataTableQueryForm>
          <DataTableSearch placeholder="Search order ID" />
          <DataTableFilters
            filters={[{
              label: "Statuses",
              name: "currentStatus",
              values: Object.values(OrderStatus).map(status => ({
                label: status,
                value: status,
              })),
            }]}
          />
          <DataTableDateRange />
        </DataTableQueryForm>}
      />
    </div>
  );
}