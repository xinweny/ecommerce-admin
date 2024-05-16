import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductItemInCart, useCart } from "@/hooks";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const addToCartSchema = z.object({
quantity: z.number().min(1)
});

type AddToCartSchema = z.infer<typeof addToCartSchema>;

interface AddToCardSectionProps {
  productItem: ProductItemInCart;
}

export function AddToCardSection({
  productItem,
}: AddToCardSectionProps) {
  const cart = useCart();

  const form = useForm<AddToCartSchema>({
    defaultValues: {
      quantity: 1,
    },
    resolver: zodResolver(addToCartSchema),
  });

  const onSubmit = (values: AddToCartSchema) => {
    cart.addItem(productItem, values.quantity);
  };

  useEffect(() => { form.reset(); }, [productItem]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-center gap-3"
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={productItem.stock}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex items-center gap-2 rounded-full"
        >
          <span>Add to Cart</span>
          <ShoppingCart />
        </Button>
      </form>
    </Form>
  );
}