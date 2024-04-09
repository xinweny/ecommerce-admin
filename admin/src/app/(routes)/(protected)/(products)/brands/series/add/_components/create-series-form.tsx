"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Brand } from "@prisma/client";

import { seriesSchema, type SeriesSchema } from "@/schemas/series";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { SubmitButton } from "@/components/form/submit-button";

import { createSeries } from "@/actions/series";

interface CreateSeriesFormProps {
  brands: Brand[];
}

export function CreateSeriesForm({
  brands,
}: CreateSeriesFormProps) {
  const router = useRouter();

  const form = useForm<SeriesSchema>({
    resolver: zodResolver(seriesSchema),
    defaultValues: {
      name: "",
      brandId: undefined,
      slug: "",
    },
  });

  const onSubmit = async (values: SeriesSchema) => {
    const { success, error } = await createSeries(values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push("/brands/series");
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
            name="brandId"
            label="Brand"
            placeholder="Select a brand"
            values={brands.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
          />
        </div>
        <SubmitButton className="ml-auto">
          Create Series
        </SubmitButton>
      </form>
    </Form>
  );
}