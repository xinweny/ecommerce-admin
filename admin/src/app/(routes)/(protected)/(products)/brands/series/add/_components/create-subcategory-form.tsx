"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";

import { subcategorySchema, type SubcategorySchema } from "@/schemas/subcategory";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { SubmitButton } from "@/components/form/submit-button";

import { createSubcategory } from "@/actions/subcategory";

interface CreateSubcategoryFormProps {
  categories: Category[];
}

export function CreateSubcategoryForm({
  categories,
}: CreateSubcategoryFormProps) {
  const router = useRouter();

  const form = useForm<SubcategorySchema>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      name: "",
      categoryId: undefined,
      slug: "",
    },
  });

  const onSubmit = async (values: SubcategorySchema) => {
    const { success, error } = await createSubcategory(values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/subcategories");
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
          <FormSelect
            name="categoryId"
            label="Category"
            placeholder="Select a category"
            values={categories.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
          />
        </div>
        <SubmitButton className="ml-auto">
          Create Subcategory
        </SubmitButton>
      </form>
    </Form>
  );
}