"use client";

import { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { upsertBillboardSchema, type UpsertBillboardSchema } from "@/schemas/billboard";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { SubmitButton } from "@/components/form/submit-button";

import { upsertBillboard } from "@/actions/billboard/upsert-billboard";

interface UpsertBillboardFormProps {
  storeId: string;
  billboard?: Billboard | null;
}

export function UpsertBillboardForm({
  storeId,
  billboard,
}: UpsertBillboardFormProps) {
  const form = useForm<UpsertBillboardSchema>({
    resolver: zodResolver(upsertBillboardSchema),
    defaultValues: {
      imageUrl: billboard?.imageUrl || undefined,
      title: billboard?.title || undefined,
      description: billboard?.description || undefined,
    },
  });

  const onSubmit = async (values: UpsertBillboardSchema) => {
    const { success, error } = await upsertBillboard(storeId, values);

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
            name="title"
            label="Title"
          />
          <FormTextarea
            name="description"
            label="Description"
          />
        </div>
        <SubmitButton className="ml-auto">
          {`${billboard ? "Update" : "Create"} Billboard`}
        </SubmitButton>
      </form>
    </Form>
  );
}