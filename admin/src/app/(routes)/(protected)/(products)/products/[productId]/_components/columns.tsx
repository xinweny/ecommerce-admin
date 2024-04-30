"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { ProductItemImage } from "@prisma/client";

import { ToggleSort } from "@/components/ui/data-table";

import { ProductItemCellCarousel } from "@/app/(routes)/(protected)/_components/product-item-cell-carousel";

import { CellAction } from "./cell-action";
import { UpdateStockForm } from "./update-stock-form";
import { UpdateArchivedForm } from "./update-archived-form";

export interface ProductItemRow {
  id: number;
  name: string;
  product: {
    id: number;
    name: string;
  };
  sku: string;
  stock: number;
  price: number;
  images: ProductItemImage[];
  isArchived: boolean;
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
    cell: ({ row }) => (row.original.images.length > 0 ? (
      <ProductItemCellCarousel
        imageUrls={row.original.images.map(image => image.imageUrl)}
      />
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
        productItemId={row.original.id}
        isArchived={row.original.isArchived}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];