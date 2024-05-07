"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { OrderStatus } from "@prisma/client";
import { format } from "date-fns";

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
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="ID"
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];