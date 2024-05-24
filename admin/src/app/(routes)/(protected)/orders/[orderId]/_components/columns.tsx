"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";

export interface OrderItemRow {
  id: string;
  product: {
    id: number;
    name: string;
  }
  productItem: {
    id: number;
    name: string;
    sku: string;
    imageUrls: string[];
  };
  quantity: number;
  price: number;
}

export const columns: ColumnDef<OrderItemRow>[] = [
  {
    accessorKey: "images",
    header: "",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}`}>
        <div className="h-24 w-24">
          <Image
            src={row.original.productItem.imageUrls[0]}
            alt="Product image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain object-center bg-slate-200 aspect-square cursor-pointer inset-0 overflow-hidden rounded-md"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Link>
    ),
  },
  {
    accessorKey: "productId",
    header: "Product",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}`}>
        {row.original.product.name}
      </Link>
    ),
  },
  {
    accessorKey: "productItemId",
    header: "Item",
    cell: ({ row }) => row.original.productItem.name,
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => row.original.productItem.sku,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => row.original.quantity,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => row.original.price,
  },
];