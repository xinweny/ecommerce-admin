import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { getCountryName } from "@/lib/utils";

import { Heading } from "@/components/shared/heading";
import { Currency } from "@/components/shared/currency";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { columns, OrderItemRow } from "./columns";

import { OrderIncludePayload } from "@/db/query/order";

interface OrderClientProps {
  order: OrderIncludePayload;
}

export function OrderClient({
  order,
}: OrderClientProps) {
  const orderItemData = order.orderItems.map((orderItem) => ({
    id: orderItem.id,
    product: {
      id: orderItem.product.id,
      name: orderItem.product.name,
    },
    productItem: {
      id: orderItem.productItem.id,
      name: orderItem.productItem.name,
      sku: orderItem.productItem.sku,
      imageUrls: orderItem.productItem.images.map(image => image.imageUrl),
    },
    quantity: orderItem.quantity,
    price: orderItem.price,
  }) satisfies OrderItemRow);

  return (
    <div className="pb-8">
      <Heading title={order.orderNumber} />
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-4 mt-8">
      <Card className="lg:col-span-1 lg:row-span-1">
        <CardHeader className="font-semibold text-lg text-muted-foreground">Order Details</CardHeader>
        <CardContent className="text-sm">
          <span>
            <span>Your order is now being processed. A confirmation email for order </span>
            <span className="font-bold">{order.orderNumber}</span>
            <span> has been sent to </span>
            <span className="font-bold">{order.email}</span>
            <span>.</span>
          </span>
        </CardContent>
      </Card>
      <Card className="lg:col-start-2 lg:row-span-1">
        <CardHeader className="font-semibold text-lg text-muted-foreground">Customer Details</CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Email</span>
              <span className="text-sm break-all">{order.email}</span>
            </div>
            <div className="block">
              <span className="font-semibold">Billing Address</span>
              <div className="text-sm flex flex-col">
                <span>{order.customerName}</span>
                <span>{order.addressLine1}</span>
                <span>{order.addressLine2}</span>
                <span>{order.city}</span>
                <span>{order.state} {order.postalCode}</span>
                <span>{getCountryName(order.country)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2 lg:row-start-2 lg:row-end-3">
        <CardHeader className="font-semibold text-lg text-muted-foreground">{`Order Items (${order.orderItems.length})`}</CardHeader>
        <CardContent>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <Currency value={order.total} />
            </div>
            <DataTable
              data={orderItemData}
              columns={columns}
              totalCount={order.orderItems.length}
              showPaginationInfo={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}