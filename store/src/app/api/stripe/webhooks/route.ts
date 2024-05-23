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
    return NextResponse.json({ message: (error as StripeError).message }, { status: 400 });
  }

  if (!event) return;

  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      { expand: ["line_items"] }
    );

    const lineItems = session.line_items?.data || [];
    const productsMetadata: {
      productId: number;
      productItemId: number;
    }[] = JSON.parse(session.metadata!.products);

    await db.order.create({
      data: {
        id: session.metadata!.orderId,
        userId: session.client_reference_id,
        orderNumber: generateOrderNumber(),
        customerName: session.customer_details!.name!,
        phoneNumber: session.customer_details!.phone!,
        email: session.customer_details!.email!,
        addressLine1: session.customer_details!.address!.line1!,
        addressLine2: session.customer_details?.address?.line2,
        city: session.customer_details!.address!.city!,
        state: session.customer_details!.address!.state!,
        postalCode: session.customer_details!.address!.postal_code!,
        country: session.customer_details!.address!.country!,
        orderItems: {
          createMany: {
            data: lineItems.map((lineItem, i) => ({
              productItemId: productsMetadata[i].productItemId,
              productId: productsMetadata[i].productId,
              price: lineItem.price!.unit_amount!,
              quantity: lineItem.quantity!,
            })),
          },
        },
        total: lineItems.reduce((agg, next) => agg + (next.price!.unit_amount! * next.quantity!), 0),
      },
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}