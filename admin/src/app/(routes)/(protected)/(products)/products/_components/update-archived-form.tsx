"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { updateArchivedSchema, type UpdateArchivedSchema } from "@/schemas/product";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { updateProductArchived } from "@/actions/product";

interface UpdateArchivedFormProps {
  productId: number;
  isArchived: boolean;
}

export function UpdateArchivedForm({
  productId,
  isArchived,
}: UpdateArchivedFormProps) {
  const router = useRouter();

  const form = useForm<UpdateArchivedSchema>({
    defaultValues: {
      isArchived,
    },
    mode: "onBlur",
    resolver: zodResolver(updateArchivedSchema),
  });
  const {
    handleSubmit,
    control,
    formState: {
      isDirty,
      isSubmitting,
    },
  } = form;

  const onSubmit = async (values: UpdateArchivedSchema) => {
    const { success, error } = await updateProductArchived(productId, values);

    if (success) {
      form.reset(values);
      toast.success(success);
      router.refresh();
    };
    if (error) toast.error(error);
  };

  useEffect(() => {
    if (!isDirty) return;

    handleSubmit(onSubmit)();
  }, [isDirty]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="isArchived"
          render={({ field }) => {
            const value = field.value ? "true" : "false";

            return (
              <FormItem>
                <Select
                  disabled={isSubmitting}
                  onValueChange={field.onChange}
                  value={value}
                  defaultValue={value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        ref={field.ref}
                        defaultValue={value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}