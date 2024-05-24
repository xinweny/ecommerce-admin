import { redirect } from "next/navigation";

import { OrderClient } from "./_components/order-client";

import { getOrderById } from "@/db/query/order";
interface OrderPageProps {
  params: { orderId: string };
}

export default async function OrderPage({
  params: { orderId },
}: OrderPageProps) {
  const order = await getOrderById(orderId);

  if (!order) redirect("/orders");

  return (
    <OrderClient
      order={order}
    />
  );
}