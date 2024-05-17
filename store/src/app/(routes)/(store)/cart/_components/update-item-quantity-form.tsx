"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { quantitySchema, QuantitySchema } from "@/schemas/quantity";

import { useCart, type CartItem } from "@/hooks";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UpdateItemQuantityFormProps {
  cartItem: CartItem;
}

export function UpdateItemQuantityForm({
  cartItem,
}: UpdateItemQuantityFormProps) {
  const updateQuantity = useCart(({ updateQuantity }) => updateQuantity);

  const form = useForm<QuantitySchema>({
    defaultValues: {
      quantity: cartItem.quantity,
    },
    resolver: zodResolver(quantitySchema),
  });

  const onSubmit = (values: QuantitySchema) => {
    if (values.quantity === cartItem.quantity) return;

    updateQuantity(cartItem.id, values.quantity);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onBlur={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="space-y-0 flex items-center gap-2">
              <FormLabel className="text-xs">Qty</FormLabel>
              <FormControl>
                <Input
                  className="text-right"
                  type="number"
                  min={1}
                  max={cartItem.stock}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}