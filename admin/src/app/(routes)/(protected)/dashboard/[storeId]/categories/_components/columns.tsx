"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface CategoryRow {
  id: string;
  name: string;
  storeId: string;
  billboard: {
    id: string;
    label: string;
  } | null;
}

export const columns: ColumnDef<CategoryRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Name"
      />
    ),
  },
  {
    accessorKey: "billboard",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Billboard"
      />
    ),
    cell: (({ row }) => row.original.billboard?.label || ""),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];