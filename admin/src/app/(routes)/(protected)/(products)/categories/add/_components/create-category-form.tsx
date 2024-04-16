"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Billboard } from "@prisma/client";

import { categorySchema, type CategorySchema } from "@/schemas/category";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";
import { FormInputSlug } from "@/components/form/form-input-slug";

import { BillboardSelect } from "../../_components/billboard-select";

import { createCategory } from "@/actions/category";

interface CreateCategoryFormProps {
  billboards: Billboard[];
}

export function CreateCategoryForm({
  billboards,
}: CreateCategoryFormProps) {
  const router = useRouter();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      billboardId: undefined,
      slug: "",
    },
  });

  const onSubmit = async (values: CategorySchema) => {
    const { success, error } = await createCategory(values);

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
          <FormInputSlug watchName="name" />
          <BillboardSelect
            name="billboardId"
            billboards={billboards}
          />
        </div>
        <SubmitButton className="ml-auto">
          Create Category
        </SubmitButton>
      </form>
    </Form>
  );
}