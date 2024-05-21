import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/config/stripe";

import { db } from "@/db/client";

interface CartItem {
  productItemId: number;
  quantity: number;
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { cartItems } = await req.json();

  if (!cartItems || cartItems.length === 0) return new NextResponse("Products at checkout are required.", { status: 400 });

  const productItems = await db.productItem.findMany({
    where: {
      id: {
        in: cartItems.map((item: CartItem) => item.productItemId),
      },
    },
    include: {
      product: { select: { id: true, name: true } },
    },
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = productItems.map(productItem => ({
    quantity: cartItems.find((item: CartItem) => productItem.id === item.productItemId)!.quantity,
    price_data: {
      currency: "CAD",
      product_data: {
        id: productItem.id,
        name: productItem.name,
        sku: productItem.sku,
        product: productItem.product,
      },
      unit_amount: productItem.price,
    },
  }));
}