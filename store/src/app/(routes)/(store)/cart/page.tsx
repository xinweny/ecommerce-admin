"use client";

import { CartItemsList } from "./_components/cart-item";

export default function CartPage() {
  return (
    <div className="px-4">
      <h1 className="text-3xl font-semibold text-black">Shopping Cart</h1>
      <CartItemsList />
    </div>
  );
}