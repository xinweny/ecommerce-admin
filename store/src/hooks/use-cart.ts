import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";

const productItemInCartArgs = {
  product: {
    include: {
      brand: { select: { id: true, name: true } },
    },
  },
  images: true,
} satisfies Prisma.ProductItemInclude;

export type ProductItemInCart = Prisma.ProductItemGetPayload<{
  include: typeof productItemInCartArgs;
}>;

export type CartItem = ProductItemInCart & {
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  addItem: (productItem: ProductItemInCart, quantity: number) => void;
  removeItem: (productItemId: number) => void;
  removeAll: () => void;
  updateQuantity: (productItemId: number, quantity: number) => void;
}

export const useCart = create(immer(persist<CartStore>((set, get) => ({
  items: [],
  addItem: (productItem: ProductItemInCart, quantity: number) => {
    if (Number.isNaN(quantity) || quantity < 1) {
      toast.error("Invalid quantity.");
      return;
    }

    if (quantity > productItem.stock) {
      toast.error("Quantity requested exceeds stock.");
      return;
    }

    set((state) => {
      const index = state.items.findIndex((item) => item.id === productItem.id);

      if (index === -1) {
        state.items.push({
          ...productItem,
          quantity,
        });
      } else {
        state.items[index].quantity += quantity;
      }

      return state;
    });

    toast.success("Item added to cart.");
  },

  removeItem: (productItemId: number) => {
    const currentItems = get().items;

    const index = currentItems.findIndex((item) => item.id === productItemId);

    if (index === -1) {
      toast.error("Item not found.");
    } else {
      set((state) => {
        state.items.splice(index, 1);
  
        return state;
      });
  
      toast.success("Item removed from cart.");
    }
  },
  removeAll: () => {
    set({ items: [] });

    toast.success("Cart cleared successfully.");
  },
  updateQuantity: (productItemId: number, quantity: number) => {
    if (Number.isNaN(quantity) || quantity < 1) {
      toast.error("Invalid quantity.");
      return;
    }

    const currentItems = get().items;

    const index = currentItems.findIndex((item) => item.id === productItemId);

    if (index === -1) {
      toast.error("Item not found.");
      return;
    }

    if (quantity >= currentItems[index].stock) {
      toast.error("Quantity requested exceeds stock.");
      return;
    }

    set((state) => {
      state.items[index].quantity = quantity;

      return state;
    });

    toast.success("Quantity updated.");
  },
}), {
  name: "cartStorage",
  storage: createJSONStorage(() => localStorage),
})));