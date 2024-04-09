"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";
import { CellAction } from "./cell-action";

export interface SeriesRow {
  id: number;
  name: string;
  slug: string;
  brand: {
    id: number;
    name: string;
  };
  productCount: number;
}

export const columns: ColumnDef<SeriesRow>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Name"
      />
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Slug"
      />
    ),
  },
  {
    accessorKey: "brandName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Brand"
      />
    ),
    cell: (({ row }) => row.original.brand.name),
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Products"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];