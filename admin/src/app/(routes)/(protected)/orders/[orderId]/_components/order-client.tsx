import { format } from "date-fns";

import { getCountryName } from "@/lib/utils";

import { Heading } from "@/components/shared/heading";
import { Currency } from "@/components/shared/currency";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { UpdateOrderStatusForm } from "./update-order-status-form";

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

  const orderDetailsData = [
    { label: "Order Number", value: order.orderNumber },
    { label: "Status", value: order.currentStatus },
    { label: "Created", value: format(order.createdAt, "dd/LL/yyyy, hh:mm aa") },
    { label: "Updated", value: format(order.updatedAt, "dd/LL/yyyy, hh:mm aa") },
  ];

  const customerDetailsData = [
    { label: "User ID", value: order.userId || null },
    { label: "Name", value: order.customerName },
    {
      label: "Address",
      value: (
        <div className="text-sm flex flex-col">
          <span>{order.addressLine1}</span>
          <span>{order.addressLine2}</span>
          <span>{order.city}</span>
          <span>{order.state} {order.postalCode}</span>
          <span>{getCountryName(order.country)}</span>
        </div>
      ),
    },
    { label: "Email", value: order.email },
    { label: "Phone", value: order.phoneNumber },
  ];

  return (
    <div className="pb-8">
      <div className="flex items-center gap-4 mb-8">
        <Heading title={order.orderNumber} />
        <UpdateOrderStatusForm order={order} />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-4">
      <Card className="lg:col-span-1 lg:row-span-1">
        <CardHeader className="font-semibold text-lg text-muted-foreground">Order Details</CardHeader>
        <CardContent className="text-sm break-all">
          {orderDetailsData.map(({ label, value }) => (
            <div
              key={label}
              className="flex gap-2 align-center justify-between text-sm border-b py-2"
            >
              <span className="font-semibold">{label}</span>
              <span className="font-light">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="lg:col-start-2 lg:row-span-1">
        <CardHeader className="font-semibold text-lg text-muted-foreground">Customer Details</CardHeader>
        <CardContent className="break-all">
        {customerDetailsData.map(({ label, value }) => (
            <div
              key={label}
              className="flex gap-2 align-center justify-between text-sm border-b py-2"
            >
              <span className="font-semibold">{label}</span>
              <span className="font-light">{value}</span>
            </div>
          ))}
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