import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

const cartProductItem = {
  product: {
    select: { id: true, name: true, model: true }
  },
} satisfies Prisma.ProductItemInclude;

type CartItem = Prisma.ProductItemGetPayload<{
  include: typeof cartProductItem;
}> & {
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  addItem: (productItem: CartItem) => void;
  removeItem: (productItemId: number) => void;
  removeAll: () => void;
  updateQuantity: (productItemId: number, quantity: number) => void;
}

export const useCart = create(persist<CartStore>((set, get) => ({
  items: [],
  addItem: (productItem: CartItem) => {
    set((state) => {
      const index = state.items.findIndex((item) => item.id === productItem.id);

      if (index === -1) {
        state.items.push(productItem);
      } else {
        state.items[index].quantity += productItem.quantity;
      }
      state.items[index].quantity += productItem.quantity;

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
    const currentItems = get().items;

    const index = currentItems.findIndex((item) => item.id === productItemId);

    if (index === -1) {
      toast.error("Item not found.");
    } else {
      set((state) => {
        state.items[index].quantity = quantity;
  
        return state;
      });
  
      toast.success("Quantity updated.");
    }
  },
}), {
  name: "cartStorage",
  storage: createJSONStorage(() => localStorage),
}));