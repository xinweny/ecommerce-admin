"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

import { useCart } from "@/hooks";

interface OrderSuccessNotificationProps {
  orderNumber: string;
}

export function OrderSuccessNotification({
  orderNumber,
}: OrderSuccessNotificationProps) {
  const clearCart = useCart(({ removeAll }) => removeAll);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="rounded-lg bg-slate-100 p-8">
      <div className="flex flex-col items-center text-green-600 gap-4 te">
        <CheckCircle2 />
        <h1 className="font-bold text-2xl">Thank you!</h1>
      </div>
      <div className="flex flex-col gap-2 mt-4 text-center">
        <span>
          <span>Order </span>
          <span className="font-bold">{orderNumber} </span>
          <span>completed successfully.</span>
        </span>
      </div>
    </div>
  );
}