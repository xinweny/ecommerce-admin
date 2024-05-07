"use client";

import { OrderStatus } from "@prisma/client";

import { OrderIncludePayload } from "@/db/query/order";

import { Heading } from "@/components/shared/heading";
import { DataTable } from "@/components/ui/data-table";
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
  }) => ({
    id,
    total,
    currentStatus,
    createdAt,
  })) satisfies OrderRow[];

  return (
    <div className="space-y-4">
      <Heading title="Orders" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
        queryPlaceholder="Search Order ID"
        filters={[{
          label: "Statuses",
          name: "currentStatus",
          values: Object.values(OrderStatus).map(status => ({
            label: status,
            value: status,
          })),
        }]}
      />
    </div>
  );
}