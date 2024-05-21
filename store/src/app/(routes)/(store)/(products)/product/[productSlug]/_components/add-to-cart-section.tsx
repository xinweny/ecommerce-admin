import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { quantitySchema, QuantitySchema } from "@/schemas/quantity";

import { ProductItemInCart, useCart } from "@/hooks";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddToCardSectionProps {
  productItem: ProductItemInCart;
}

export function AddToCardSection({
  productItem,
}: AddToCardSectionProps) {
  const addItem = useCart(({ addItem }) => addItem);

  const form = useForm<QuantitySchema>({
    defaultValues: {
      quantity: 1,
    },
    resolver: zodResolver(quantitySchema),
  });

  const onSubmit = (values: QuantitySchema) => {
    addItem(productItem, values.quantity);
  };

  useEffect(() => { form.reset(); }, [productItem]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-end gap-3"
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="text-xs">Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={productItem.stock}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex items-center gap-2 rounded-full"
          disabled={form.formState.isSubmitting}
        >
          <span>Add to Cart</span>
          <ShoppingCart />
        </Button>
      </form>
    </Form>
  );
}