"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useClickAway } from "@uidotdev/usehooks";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { updateProductItemStockSchema, type UpdateProductItemStockSchema } from "@/schemas/product";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProductItemStock } from "@/actions/product";

interface UpdateStockFormProps {
  productItemId: number;
  stock: number;
}

export function UpdateStockForm({
  productItemId,
  stock,
}: UpdateStockFormProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState<boolean>(false);

  const clickAwayRef = useClickAway(() => {
    setShowForm(false);
  });

  const form = useForm<UpdateProductItemStockSchema>({
    defaultValues: {
      stock,
    },
    mode: "onBlur",
    resolver: zodResolver(updateProductItemStockSchema),
  });

  const onSubmit = async (values: UpdateProductItemStockSchema) => {
    const { success, error } = await updateProductItemStock(productItemId, values);

    if (success) {
      form.reset();
      toast.success(success);
      router.refresh();
      setShowForm(false);
    };
    if (error) toast.error(error);
  };

  return (
    <div
      onClick={() => { setShowForm(true); }}
      ref={clickAwayRef as React.RefObject<HTMLDivElement>}
      className="hover:cursor-pointer"
    >
      {showForm
        ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )
        : (
          <span>{stock}</span>
        )
      }
    </div>
  );
}