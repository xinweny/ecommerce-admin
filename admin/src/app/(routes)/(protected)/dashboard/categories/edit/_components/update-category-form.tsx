"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Billboard, Category } from "@prisma/client";

import { categorySchema, type CategorySchema } from "@/schemas/category";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { SubmitButton } from "@/components/form/submit-button";

import { createCategory } from "@/actions/category";

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
      billboardId: category.billboardId,
    },
  });

  const onSubmit = async (values: CategorySchema) => {
    const { success, error } = await createCategory(values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/dashboard/categories");
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
          <FormSelect
            name="billboardId"
            label="Billboard"
            placeholder="Select a billboard"
            values={[
              { value: null, label: "null" },
              ...billboards.map(({ id, label }) => ({
                value: id,
                label,
              })),
            ]}
          />
        </div>
        <SubmitButton className="ml-auto">
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}