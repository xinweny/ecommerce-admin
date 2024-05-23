import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";

import { stripe } from "@/config/stripe";

import { db } from "@/db/client";

interface CartItem {
  productItemId: number;
  quantity: number;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.CLIENT_URL!,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(
  req: Request,
) {
  const { cartItems, userId } = await req.json();

  if (!cartItems || cartItems.length === 0) return new NextResponse("Products at checkout are required.", { status: 400 });

  const itemQuantity = cartItems.reduce((acc: { [key: string]: CartItem; }, next: CartItem) => ({
    ...acc,
    [next.productItemId]: next,
  }), {});

  const productItems = await db.productItem.findMany({
    where: {
      id: {
        in: cartItems.map((item: CartItem) => item.productItemId),
      },
    },
    include: {
      product: { select: { id: true, name: true } },
      images: { select: { imageUrl: true } },
    },
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = productItems.map(productItem => ({
    quantity: itemQuantity[productItem.id].quantity,
    price_data: {
      currency: "CAD",
      product_data: {
        images: productItem.images.map(image => image.imageUrl),
        name: productItem.product.name,
        description: productItem.name,
      },
      unit_amount: productItem.price,
    },
  }));

  const orderId = createId();

  const session = await stripe.checkout.sessions.create({
    client_reference_id: userId,
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    invoice_creation: { enabled: true },
    success_url: `${process.env.CLIENT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: {
      products: JSON.stringify(productItems.map(productItem => ({
        productId: productItem.productId,
        productItemId: productItem.id,
      }))),
      orderId,
    },
  });

  return session.url
    ? NextResponse.json({ url: session.url })
    : NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
}