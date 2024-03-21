"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createStoreSchema, type CreateStoreSchema } from "@/schemas/store";

import { useStoreModal } from "@/hooks";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { CancelButton } from "@/components/form/cancel-button";

import { createStore } from "@/actions/store";

export function CreateStoreForm() {
  const { onClose } = useStoreModal();

  const router = useRouter();

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: ""
    },
  });

  const onSubmit = async (values: CreateStoreSchema) => {
    const { data, error, success } = await createStore(values);

    if (error) toast.error(error);
    if (success) {
      onClose();
      toast.success(success);
      router.push(`/dashboard/${data.storeId}`);
    }
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <SubmitButton>Create</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}