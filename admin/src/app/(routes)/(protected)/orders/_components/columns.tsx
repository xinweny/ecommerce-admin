"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { OrderStatus } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

export interface OrderRow {
  id: string;
  total: number;
  currentStatus: OrderStatus;
  createdAt: Date;
  user: {
    id: string;
  };
  orderNumber: string;
  firstName: string;
  lastName: string;
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
    header: "User",
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Created"
      />
    ),
    cell: ({ row }) => format(row.original.createdAt, "dd/mm/yyyy"),
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
  },
];