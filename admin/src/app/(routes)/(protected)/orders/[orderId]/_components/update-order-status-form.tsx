"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Order, OrderStatus } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { updateOrderStatusSchema, type UpdateOrderStatusSchema } from "@/schemas/order";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { updateOrderStatus } from "@/actions/order";

interface UpdateOrderStatusFormProps {
  order: Order;
}

export function UpdateOrderStatusForm({
  order,
}: UpdateOrderStatusFormProps) {
  const router = useRouter();

  const [showForm, setShowForm] = useState<boolean>(false);

  const form = useForm<UpdateOrderStatusSchema>({
    defaultValues: {
      status: order.currentStatus,
    },
    resolver: zodResolver(updateOrderStatusSchema),
    mode: "onBlur",
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: UpdateOrderStatusSchema) => {
    const { success, error } = await updateOrderStatus(order.id, values);

    if (success) {
      form.reset();
      toast.success(success);
      router.refresh();
    };
    if (error) toast.error(error);

    setShowForm(false);
  };

  return showForm
    ? (
      <Form {...form}>
        <form
          className="flex gap-2 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  disabled={isSubmitting}
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(OrderStatus).map(([key, value]) => (
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            className="text-sm"
            type="submit"
          >
            Update Status
          </Button>
        </form>
      </Form>
    )
    : (
      <div className="flex gap-2 items-center">
        <Badge
          variant={order.currentStatus === OrderStatus.cancelled
            ? "destructive"
            : (
              order.currentStatus === OrderStatus.fulfilled
                ? "default"
                : "secondary"
            )
          }
        >
          {order.currentStatus}
        </Badge>
        <Button
          className="text-sm"
          variant="link"
          onClick={() => { setShowForm(true); }}
        >
          Update Status
        </Button>
      </div>
    );
}