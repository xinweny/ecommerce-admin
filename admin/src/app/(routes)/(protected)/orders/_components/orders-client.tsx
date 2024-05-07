"use client";

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
}: OrdersClientProps) {
  const data = orders.map(({
    id,
    total,
    currentStatus,
  }) => ({
    id,
    total,
    currentStatus,
  })) satisfies OrderRow[];

  return (
    <div className="space-y-4">
      <Heading title="Reviews" />
      <Separator />
      <DataTable
        data={data}
        columns={columns}
        totalCount={totalCount}
        queryPlaceholder="Search ID"
      />
    </div>
  );
}