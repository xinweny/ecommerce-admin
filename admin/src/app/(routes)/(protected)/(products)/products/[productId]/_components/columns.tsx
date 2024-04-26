"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

import { ProductItemCellCarousel } from "@/app/(routes)/(protected)/_components/product-item-cell-carousel";

import { CellAction } from "./cell-action";

export interface ProductItemRow {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
  imageUrls: string[];
  totalSold: number;
}

export const columns: ColumnDef<ProductItemRow>[] = [
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
    accessorKey: "imageUrls",
    header: "",
    cell: ({ row }) => (row.original.imageUrls.length > 0 ? (
      <ProductItemCellCarousel imageUrls={row.original.imageUrls} />
    ) : null),
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
    accessorKey: "sku",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="SKU"
      />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Stock"
      />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Price"
      />
    ),
  },
  {
    accessorKey: "totalSold",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Total Sold"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];