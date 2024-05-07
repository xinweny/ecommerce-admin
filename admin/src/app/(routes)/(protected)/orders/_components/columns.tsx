"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { OrderStatus } from "@prisma/client";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface OrderRow {
  id: string;
  total: number;
  currentStatus: OrderStatus;
  createdAt: Date;
}

export const columns: ColumnDef<OrderRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}/reviews`}>
        {row.original.product.name}
      </Link>
    ),
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Created"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];