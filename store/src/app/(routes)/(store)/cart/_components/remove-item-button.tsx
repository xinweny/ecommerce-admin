"use client";

import { useCart } from "@/hooks";

interface RemoveItemButtonProps {
  itemId: number;
}

export function RemoveItemButton({
  itemId,
}: RemoveItemButtonProps) {
  const removeItem = useCart(({ removeItem }) => removeItem);

  return (
    <button
      onClick={() => { removeItem(itemId); }}
      className="hover:underline decoration-slate-500"
      aria-label="Remove item from cart"
    >
      <span className="text-xs text-slate-500">Delete</span>
    </button>
  )
}