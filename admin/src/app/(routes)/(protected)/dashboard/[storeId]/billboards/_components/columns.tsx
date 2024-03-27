"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface BillboardRow {
  id: string;
  label: string;
  createdAt: string;
}
 
export const columns: ColumnDef<BillboardRow>[] = [
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];