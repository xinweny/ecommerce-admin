import { redirect } from "next/navigation";

import { stripe } from "@/config/stripe";

import { getOrderById } from "@/db/query/order";

import { OrderSuccessNotification } from "./_components/order-success-notification";
import { OrderSummary } from "./_components/order-summary";

interface OrderSuccessPageProps {
  searchParams: { [key: string]: string };
}

export default async function OrderSuccessPage({
  searchParams: { sessionId },
}: OrderSuccessPageProps) {
  if (!sessionId) redirect("/");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) redirect("/");

  console.log(session);

  const order = await getOrderById(session.metadata!.orderId);

  if (!order) redirect("/");

  return (
    <div className="flex flex-col gap-8">
      <OrderSuccessNotification
        orderNumber={order.orderNumber}
      />
      <div className="grow">
        <OrderSummary order={order} />
      </div>
    </div>
  );
}