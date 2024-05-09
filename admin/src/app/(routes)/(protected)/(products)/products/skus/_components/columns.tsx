"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

import { ProductItemCellCarousel } from "@/app/(routes)/(protected)/_components/product-item-cell-carousel";
import { UpdateStockForm } from "../../_components/update-stock-form";
import { UpdateArchivedForm } from "../../_components/update-archived-form";

import { CellAction } from "./cell-action";

export interface ProductItemRow {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
  imageUrls: string[];
  product: {
    id: number;
    name: string;
  };
  isArchived: boolean;
}

export const columns: ColumnDef<ProductItemRow>[] = [
  {
    accessorKey: "imageUrls",
    header: "Images",
    cell: ({ row }) => (row.original.imageUrls.length > 0 ? (
      <ProductItemCellCarousel imageUrls={row.original.imageUrls} />
    ) : null),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Product"
      />
    ),
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}`}>{row.original.product.name}</Link>
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
    accessorKey: "sku",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="SKU"
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
    accessorKey: "stock",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Stock"
      />
    ),
    cell: ({ row }) => (
      <UpdateStockForm
        productItemId={row.original.id}
        stock={row.original.stock}
      />
    ),
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Archived"
      />
    ),
    cell: ({ row }) => (
      <UpdateArchivedForm
        id={row.original.id}
        isArchived={row.original.isArchived}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];