"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface ProductRow {
  id: number;
  name: string;
  brand: {
    id: number;
    name: string;
  };
  series?: {
    id: number;
    name: string;
  };
  model?: string;
  category: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
  slug: string;
  productItems: {
    count: number;
    totalStock: number;
  };
}

export const columns: ColumnDef<ProductRow>[] = [
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
    accessorKey: "model",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Model"
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
    cell: ({ row }) => row.original.category.name,
  },
  {
    accessorKey: "subcategoryName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Subcategory"
      />
    ),
    cell: ({ row }) => row.original.subcategory.name,
  },
  {
    accessorKey: "brandName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Brand"
      />
    ),
    cell: ({ row }) => row.original.brand.name,
  },
  {
    accessorKey: "seriesName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Series"
      />
    ),
    cell: ({ row }) => row.original.series?.name || "",
  },
  {
    accessorKey: "skusCount",
    header: "SKUs",
    cell: ({ row }) => row.original.productItems.count,
  },
  {
    accessorKey: "totalStock",
    header: "Total Stock",
    cell: ({ row }) => row.original.productItems.totalStock,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];