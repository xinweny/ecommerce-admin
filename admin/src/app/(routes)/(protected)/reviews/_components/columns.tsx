"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface ProductReviewRow {
  product: {
    id: number;
    name: string;
  };
  reviewCount: number;
  avgRating: number | null;
}

export const columns: ColumnDef<ProductReviewRow>[] = [
  {
    accessorKey: "productId",
    header: "Product ID",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}/reviews`}>
        {row.original.product.id}
      </Link>
    ),
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}/reviews`}>
        {row.original.product.name}
      </Link>
    ),
  },
  {
    accessorKey: "avgRating",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Average Rating"
      />
    ),
  },
  {
    accessorKey: "reviewCount",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Review Count"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];