import { NextResponse } from "next/server";
import { StripeError } from "@stripe/stripe-js";

import { stripe } from "@/config/stripe";

import { db } from "@/db/client";

import { generateOrderNumber } from "@/lib/id";

export async function POST(req: Request) {
  const payload = await req.text();

  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      req.headers.get("stripe-signature")!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as StripeError).message },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      { expand: ["line_items"] }
    );

    const lineItems = session.line_items?.data || [];

    console.log(lineItems);
  }
  // const order = await db.order.create({
  //   data: {
  //     orderNumber: generateOrderNumber(),
  //     orderItems: {
  //       createMany: {
  //         data: lineItems.map(lineItem => ({
  //           productId: lineItem
  //         })),
  //       },
  //     },
  //   },
  // });

  return NextResponse.json({ received: true }, { status: 200 });
}