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
import { ImageUpload } from "@/components/form/image-upload";

import { upsertBillboard } from "@/actions/billboard";
import { ImagePreview } from "@/components/form/image-preview";

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
      imageUrl: billboard?.imageUrl || "",
      title: billboard?.title || "",
      description: billboard?.description || "",
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
          <ImageUpload
            label="Background Image"
            folder="billboards"
            name="imageUrl"
            publicId={storeId}
            preview={
              <ImagePreview
                name="imageUrl"
                listClassName="mb-4 flex items-center gap-4"
                containerClassName="w-[860px] h-[480px]"
              />
            }
          />
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