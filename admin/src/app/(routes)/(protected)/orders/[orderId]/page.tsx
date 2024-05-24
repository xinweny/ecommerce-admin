import { redirect } from "next/navigation";

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
    <></>
  );
}