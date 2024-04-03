"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  billboard: {
    id: number;
    label: string;
  } | null;
  productCount: number;
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
    cell: ({ row }) => (
      <Link href={`/dashboard/categories/${row.original.id}`}>
        {row.original.name}
      </Link>
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
    accessorKey: "productCount",
    header: "Products",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];