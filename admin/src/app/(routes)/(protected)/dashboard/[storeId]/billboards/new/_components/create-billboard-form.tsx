"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { createBillboardSchema, type CreateBillboardSchema } from "@/schemas/billboard";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { SubmitButton } from "@/components/form/submit-button";
import { ImageUpload } from "@/components/form/image-upload";
import { ImagePreview } from "@/components/form/image-preview";

import { createBillboard } from "@/actions/billboard";

interface CreateBillboardFormProps {
  storeId: string;
}

export function CreateBillboardForm({
  storeId,
}: CreateBillboardFormProps) {
  const router = useRouter();

  const form = useForm<CreateBillboardSchema>({
    resolver: zodResolver(createBillboardSchema),
    defaultValues: {
      label: "",
      imageUrl: "",
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: CreateBillboardSchema) => {
    const { success, error } = await createBillboard(storeId, values);

    if (success) {
      toast.success(success);
      router.push(`/dashboard/${storeId}/billboards`);
    };
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
            name="label"
            label="Label"
          />
          <ImageUpload
            label="Background Image"
            folder={`stores/${storeId}/billboards`}
            name="imageUrl"
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
          Create Billboard
        </SubmitButton>
      </form>
    </Form>
  );
}