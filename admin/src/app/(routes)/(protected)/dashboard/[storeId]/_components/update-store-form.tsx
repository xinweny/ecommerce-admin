"use client";

import { useState } from "react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateStoreSchema, type UpdateStoreSchema } from "@/schemas/store";

import { Separator } from "@/components/ui/separator";
import {
  Form,
} from "@/components/ui/form";
import { FormHeader } from "@/components/form/form-header";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";

import { DeleteStoreButton } from "./delete-store-button";



interface UpdateStoreFormProps {
  store: Store;
}

export function UpdateStoreForm({ store }: UpdateStoreFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<UpdateStoreSchema>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = (values: UpdateStoreSchema) => {

  };

  return (
    <>
      <div className="flex items-center justify-between">
        <FormHeader title="Settings" description="Manage store preferences" />
        <DeleteStoreButton storeId={store.id} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-8 w-full"
        >
          <div className="rid grid-col-3 gap-8">
            <FormInput
              name="name"
              label="Store Name"
            />
          </div>
          <SubmitButton
            className="ml-auto"
          >Save Changes</SubmitButton>
        </form>
      </Form>
    </>
  );
}