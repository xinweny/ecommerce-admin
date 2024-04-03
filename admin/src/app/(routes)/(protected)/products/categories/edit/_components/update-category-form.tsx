"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Billboard, Category } from "@prisma/client";

import { categorySchema, type CategorySchema } from "@/schemas/category";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";

import { BillboardSelect } from "../../_components/billboard-select";

import { updateCategory } from "@/actions/category";

interface UpdateCategoryFormProps {
  category: Category;
  billboards: Billboard[];
}

export function UpdateCategoryForm({
  category,
  billboards,
}: UpdateCategoryFormProps) {
  const router = useRouter();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      billboardId: category.billboardId,
    },
  });

  const onSubmit = async (values: CategorySchema) => {
    const { success, error } = await updateCategory(category.id, values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/products/categories");
    };
    if (error) toast.error(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 w-full"
      >
        <div className="grid grid-cols-2 gap-8">
          <FormInput
            name="name"
            label="Name"
          />
          <FormInput
            name="slug"
            label="Slug"
            description="A URL-friendly name for your category, containing only lowercase letters and hyphens."
          />
          <BillboardSelect
            name="billboardId"
            billboards={billboards}
          />
        </div>
        <SubmitButton className="ml-auto">
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}