"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { productSchema, type ProductSchema } from "@/schemas/product";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";

import { createProduct } from "@/actions/product";

interface CreateProductFormProps {

}

export function CreateCategoryForm({

}: CreateProductFormProps) {
  const router = useRouter();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      categoryId: undefined,
      subcategoryId: undefined,
      brandId: undefined,
      seriesId: undefined,
    },
  });

  const onSubmit = async (values: ProductSchema) => {
    const { success, error } = await createProduct(values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/categories");
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
          Create Product
        </SubmitButton>
      </form>
    </Form>
  );
}