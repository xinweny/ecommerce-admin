import Image from "next/image";
import {format} from "date-fns";

import { OrderIncludePayload } from "@/db/query/order";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Currency } from "@/components/shared/currency";

interface OrderSummaryProps {
  order: OrderIncludePayload;
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function OrderSummary({
  order,
}: OrderSummaryProps) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-4">
      <Card className="lg:col-span-1 lg:row-span-1">
        <CardHeader className="font-semibold text-lg text-muted-foreground">Your Order Is Confirmed</CardHeader>
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
      <Card className="lg:col-start-1 lg:row-start-2 lg:row-end-3">
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
                <span>{regionNames.of(order.country)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-start-2 lg:row-start-1 lg:row-end-3">
        <CardHeader className="font-semibold text-lg text-muted-foreground">Order Summary</CardHeader>
        <CardContent>
          <CardDescription className="text-right">
            {format(order.createdAt, "dd LLL yyyy, hh:mm aa")}
          </CardDescription>
          <div className="space-y-4 mt-2">
            <div>
              {order.orderItems.map(orderItem => (
                <div
                  key={orderItem.id}
                  className="pb-4 border-b flex"
                >
                  <div className="grow flex gap-4">
                    <div className="h-24 w-24">
                      <Image
                        src={orderItem.productItem.images[0].imageUrl}
                        alt="Product image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-contain object-center bg-slate-200 aspect-square cursor-pointer inset-0 overflow-hidden rounded-md"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="grow flex flex-col">
                      <span className="font-semibold">{orderItem.productItem.product.name}</span>
                      <span className="text-sm text-muted-foreground">{orderItem.productItem.name}</span>
                    </div>
                  </div>
                  <div className="text-sm flex gap-12">
                    <span>{orderItem.quantity}x</span>
                    <Currency value={orderItem.price} />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-b pb-4 text-sm flex justify-between">
              <div>
                <span>Subtotal</span>
              </div>
              <div>
              <Currency value={order.total} />
              </div>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <Currency value={order.total} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}