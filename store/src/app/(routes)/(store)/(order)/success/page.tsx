import { redirect } from "next/navigation";

import { stripe } from "@/config/stripe";

import { getOrderById } from "@/db/query/order";

interface OrderSuccessPageProps {
  searchParams: { [key: string]: string };
}

export default async function OrderSuccessPage({
  searchParams: { sessionId },
}: OrderSuccessPageProps) {
  if (!sessionId) redirect("/");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) redirect("/");

  const order = await getOrderById(session.metadata!.orderId);

  if (!order) redirect("/");

  return (
    <div>
      <h1>{`Order Placed (${order.orderNumber})`}</h1>
      <div>
        <span>Thank you for your order!</span>
        <p>{`A receipt for order ${order.orderNumber} has been sent to ${order.email}.`}</p>
      </div>
    </div>
  );
}