"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Billboard } from "@prisma/client";

import { categorySchema, type CategorySchema } from "@/schemas/category";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { SubmitButton } from "@/components/form/submit-button";

import { createCategory } from "@/actions/category";

interface CreateCategoryFormProps {
  storeId: string;
  billboards: Billboard[];
}

export function CreateCategoryForm({
  storeId,
  billboards,
}: CreateCategoryFormProps) {
  const router = useRouter();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      billboardId: null,
    },
  });

  const onSubmit = async (values: CategorySchema) => {
    const { success, error } = await createCategory(storeId, values);

    if (success) {
      toast.success(success);
      router.push(`/dashboard/${storeId}/categories`);
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
            name="name"
            label="Name"
          />
          <FormSelect
            name="billboardId"
            label="Billboard"
            placeholder="Select a billboard"
            values={[
              { value: null, label: "" },
              ...billboards.map(({ id, label }) => ({
                value: id,
                label,
              })),
            ]}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <SubmitButton className="ml-auto">
            Create
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  );
}