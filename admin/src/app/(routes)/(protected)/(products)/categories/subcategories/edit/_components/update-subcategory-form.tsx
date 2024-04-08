"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Category, Subcategory } from "@prisma/client";

import { subcategorySchema, type SubcategorySchema } from "@/schemas/subcategory";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { SubmitButton } from "@/components/form/submit-button";

import { updateSubcategory } from "@/actions/subcategory";

interface UpdateSubcategoryFormProps {
  subcategory: Subcategory;
  categories: Category[];
}

export function UpdateSubcategoryForm({
  subcategory,
  categories,
}: UpdateSubcategoryFormProps) {
  const router = useRouter();

  const form = useForm<SubcategorySchema>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      slug: subcategory.slug,
    },
  });

  const onSubmit = async (values: SubcategorySchema) => {
    const { success, error } = await updateSubcategory(subcategory.id, values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/categories/subcategories");
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
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}