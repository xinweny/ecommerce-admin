"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { ToggleSort } from "@/components/ui/data-table";

export interface ProductOrderItemRow {
  quantity: number;
  price: number;
  order: {
    id: string;
    orderNumber: string;
    createdAt: Date;
  };
  productItem: {
    id: number;
    name: string;
    sku: string;
  };
  product: {
    id: number;
  };
}

export const columns: ColumnDef<ProductOrderItemRow>[] = [
  {
    accessorKey: "orderId",
    header: "Order Number",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original.order.id}`}>
        {row.original.order.orderNumber}
      </Link>
    ),
  },
  {
    accessorKey: "productItemId",
    header: "SKU",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product.id}/skus`}>
        {row.original.productItem.sku}
      </Link>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Created"
      />
    ),
    cell: ({ row }) => format(row.original.order.createdAt, "dd/LL/yyyy"),
  },
];