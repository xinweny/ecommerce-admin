"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { brandSchema, type BrandSchema } from "@/schemas/brand";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";

import { createBrand } from "@/actions/brand/create-brand";

export function CreateBrandForm() {
  const router = useRouter();

  const form = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (values: BrandSchema) => {
    const { success, error } = await createBrand(values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/brands");
    };
    if (error) toast.error(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 w-full"
      >
        <div className="flex flex-col gap-8">
          <FormInput
            name="name"
            label="Name"
          />
          <FormInput
            name="slug"
            label="Slug"
            description="A URL-friendly name for your category, containing only lowercase letters and hyphens."
          />
        </div>
        <SubmitButton className="ml-auto">
          Create Brand
        </SubmitButton>
      </form>
    </Form>
  );
}