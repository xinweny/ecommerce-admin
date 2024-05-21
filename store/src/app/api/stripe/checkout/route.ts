import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/config/stripe";

import { db } from "@/db/client";

interface CartItem {
  productItemId: number;
  quantity: number;
}

const corsHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: corsHeaders,
  });
}

export async function POST(
  req: Request,
) {
  const { cartItems } = await req.json();

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
        name: `${productItem.product.name} - ${productItem.name}`,
      },
      unit_amount: productItem.price,
    },
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    success_url: `${process.env.CLIENT_URL}/cart?success=1`,
    cancel_url: `${process.env.CLIENT_URL}/cart?canceled=1`,
  });

  return session.url
    ? NextResponse.redirect(session.url)
    : NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
}