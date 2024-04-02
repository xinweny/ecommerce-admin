"use client";

import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { storeSchema, type StoreSchema } from "@/schemas/store"

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
  const form = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
      line1: store.line1,
      line2: store.line2 || "",
      line3: store.line3 || "",
      city: store.city,
      postalCode : store.postalCode,
      country: store.country,
    },
  });

  const onSubmit = async (values: StoreSchema) => {
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
          <div>
            <h2>Address</h2>
            <FormInput
              name="line1"
              label="Line 1"
            />
            <FormInput
              name="line2"
              label="Line 2"
            />
            <FormInput
              name="line3"
              label="Line 3"
            />
            <FormInput
              name="city"
              label="City"
            />
            <FormInput
              name="state"
              label="State"
            />
            <FormInput
              name="postalCode"
              label="Postal Code"
            />
            <FormInput
              name="country"
              label="Country"
            />
          </div>
        </div>
        <SubmitButton className="ml-auto">Save Changes</SubmitButton>
      </form>
    </Form>
  );
}