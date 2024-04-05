"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";
import { CellAction } from "./cell-action";

export interface SubcategoryRow {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
  };
  productCount: number;
}

export const columns: ColumnDef<SubcategoryRow>[] = [
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
    accessorKey: "categoryName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Category"
      />
    ),
    cell: (({ row }) => row.original.category.name),
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