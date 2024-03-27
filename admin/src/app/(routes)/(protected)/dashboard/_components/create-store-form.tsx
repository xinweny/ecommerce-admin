"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { createStoreSchema, type CreateStoreSchema } from "@/schemas/store";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { SubmitButton } from "@/components/form/submit-button";
import { CancelButton } from "@/components/form/cancel-button";

import { createStore } from "@/actions/store";

interface CreateStoreFormProps {
  onClose: () => void;
}

export function CreateStoreForm({
  onClose,
}: CreateStoreFormProps) {
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
          <DialogFooter>
            <CancelButton onClick={onClose}>Close</CancelButton>
            <SubmitButton>Create</SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}