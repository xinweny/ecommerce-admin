"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { OrderStatus, UserAddress } from "@prisma/client";
import { format } from "date-fns";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface OrderRow {
  id: string;
  total: number;
  currentStatus: OrderStatus;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
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
    accessorKey: "userId",
    header: "Name",
    cell: ({ row }) => `${row.original.user.firstName} ${row.original.user.lastName}`,
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