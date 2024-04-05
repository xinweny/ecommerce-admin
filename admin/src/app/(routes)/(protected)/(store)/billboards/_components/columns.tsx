"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface BillboardRow {
  id: number;
  label: string;
  createdAt: string;
  storeId: string;
  categoryCount: number;
}
 
export const columns: ColumnDef<BillboardRow>[] = [
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
    accessorKey: "label",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Label"
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
    accessorKey: "categoryCount",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Categories"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];