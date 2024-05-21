"use client";

import { useCart } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/shared/currency";

export function OrderSummary() {
  const total = useCart(({ items }) => {
    return items.reduce(
      (prev, item) => prev + (item.quantity * item.price),
      0
    );
  });

  const onCheckout = async () => {
    
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="font-medium">Total</span>
          <Currency value={total} className="font-semibold text-xl" />
        </div>
        <Button
          onClick={onCheckout}
          className="rounded-full w-full"
          size="lg"
          disabled={total === 0}
        >
          <span className="font-medium">Checkout</span>
        </Button>
      </div>
    </div>
  );
}