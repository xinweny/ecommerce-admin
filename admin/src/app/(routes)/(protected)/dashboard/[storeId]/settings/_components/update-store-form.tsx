"use client";

import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { updateStoreSchema, type UpdateStoreSchema } from "@/schemas/store";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";

import { updateStore } from "@/actions/store";

interface UpdateStoreFormProps {
  store: Store;
}

export function UpdateStoreForm({
  store,
}: UpdateStoreFormProps) {
  const form = useForm<UpdateStoreSchema>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = async (values: UpdateStoreSchema) => {
    const { success, error } = await updateStore(store.id, values);

    if (success) toast.success(success);
    if (error) toast.error(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 w-full"
      >
        <div className="grid grid-col-3 gap-8">
          <FormInput
            name="name"
            label="Store Name"
          />
        </div>
        <SubmitButton className="ml-auto">Save Changes</SubmitButton>
      </form>
    </Form>
  );
}