import { type CartItem, useCart } from "@/hooks";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Currency } from "@/components/shared/currency";

interface CartItemProps {
  cartItem: CartItem;
}

export function CartItem({
  cartItem,
}: CartItemProps) {
  const cart = useCart(({ updateQuantity, removeItem }) => ({
    updateQuantity,
    removeItem,
  }));

  const {
    images,
    product,
  } = cartItem;

  return (
    <li className="flex py-6 border-b">
      <div className="h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={images[0].imageUrl}
            alt="Product image"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain object-center bg-slate-200 aspect-square cursor-pointer inset-0 overflow-hidden rounded-md"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </div>
      <div className="grow ml-4 flex flex-col sm:ml-6">
        <button
          onClick={() => {
            cart.removeItem(cartItem.id);
          }}
          className="self-end"
        >
          <X size={16} />
        </button>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Link href={`/product/${product.slug}`}>
              <span className="text-lg font-medium">{product.name}</span>
            </Link>
            <span>{cartItem.name}</span>
          </div>
          <div className="flex flex-col">
            <Currency
              className="text-xl font-bold"
              value={cartItem.price}
            />
            <Input
              className="text-right"
              type="number"
              min={1}
              max={cartItem.stock}
              defaultValue={cartItem.quantity}
              onBlur={(e) => {
                cart.updateQuantity(cartItem.id, +e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export function CartItemsList() {
  const cartItems = useCart(({ items }) => items);

  return (
    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
      <div className="lg:col-span-7">
        {cartItems.length === 0
          ? (
            <p className="text-neutral-500">Cart is empty.</p>
          )
          : (
            <ul>
              {cartItems.map(cartItem => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                />
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}