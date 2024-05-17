import Link from "next/link";
import Image from "next/image";

import { capitalize } from "@/lib/utils";

import { useCart, type CartItem } from "@/hooks";

import { Currency } from "@/components/shared/currency";

import { RemoveItemButton } from "./remove-item-button";
import { UpdateItemQuantityForm } from "./update-item-quantity-form";

interface CartItemProps {
  cartItem: CartItem;
}

export function CartItem({
  cartItem,
}: CartItemProps) {
  const {
    images,
    product,
  } = cartItem;

  const specifications = {
    ...(product.model && { model: product.model }),
    type: cartItem.name,
  };

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
      <div className="grow ml-4 flex flex-col sm:ml-6 justify-between">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Link href={`/product/${product.slug}`}>
              <span className="text-lg font-medium">{product.name}</span>
            </Link>
            <span className="text-sm">{product.brand.name}</span>
            <div className="flex flex-col mt-4">
              {Object.entries(specifications).map(([key, value]) => (
                <span key={key} className="text-sm">
                  <span className="font-bold">{`${capitalize(key)}: `}</span>
                  <span>{value}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <Currency
              className="text-xl font-bold"
              value={cartItem.price}
            />
            <UpdateItemQuantityForm cartItem={cartItem} />
          </div>
        </div>
        <div className="self-end">
          <RemoveItemButton itemId={cartItem.id} />
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