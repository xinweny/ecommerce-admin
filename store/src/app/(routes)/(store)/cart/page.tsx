"use client";

import { CartItemsList } from "./_components/cart-item";
import { OrderSummary } from "./_components/order-summary";

export default function CartPage() {
  return (
    <div className="px-4">
      <h1 className="text-3xl font-semibold text-black">Shopping Cart</h1>
      <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        <CartItemsList />
        <OrderSummary />
      </div>
    </div>
  );
}