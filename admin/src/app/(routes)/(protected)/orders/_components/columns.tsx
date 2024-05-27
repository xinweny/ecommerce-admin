"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { OrderStatus } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";
import { Currency } from "@/components/shared/currency";

export interface OrderRow {
  id: string;
  total: number;
  currentStatus: OrderStatus;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  orderNumber: string;
  customerName: string;
}

export const columns: ColumnDef<OrderRow>[] = [
  {
    accessorKey: "id",
    header: "Number",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.id}`}>
        {row.original.orderNumber}
      </Link>
    ),
  },
  {
    accessorKey: "userId",
    header: "Customer",
    cell: ({ row }) => row.original.customerName,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Created"
      />
    ),
    cell: ({ row }) => format(row.original.createdAt, "dd/LL/yyyy"),
  },
  {
    accessorKey: "currentStatus",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Status"
      />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Total"
      />
    ),
    cell: ({ row }) => <Currency value={row.original.total} />
  },
];