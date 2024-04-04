"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

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
    accessorKey: "subcategoryCount",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Subcategories"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <></>
  }
];