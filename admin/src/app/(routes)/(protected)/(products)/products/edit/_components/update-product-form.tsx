"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Category, Brand, Subcategory, Series, Product } from "@prisma/client";
import useSWR from "swr";

import { productSchema, type ProductSchema } from "@/schemas/product";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";
import { FormSelect } from "@/components/form/form-select";
import { FormInputSlug } from "@/components/form/form-input-slug";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSwitch } from "@/components/form/form-switch";

import { updateProduct } from "@/actions/product";

interface UpdateProductFormProps {
  product: Product;
  categories: Category[];
  brands: Brand[];
}

export function UpdateProductForm({
  product,
  categories,
  brands,
}: UpdateProductFormProps) {
  const router = useRouter();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      slug: product.slug,
      model: product.model,
      description: product.description || undefined,
      videoUrl: product.videoUrl || undefined,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId || undefined,
      brandId: product.brandId,
      seriesId: product.seriesId || undefined,
      isArchived: product.isArchived,
      isFeatured: product.isFeatured,
    },
  });

  const categoryId = form.watch("categoryId");
  const brandId = form.watch("brandId");

  const subcategories = useSWR(
    { categoryId },
    async ({ categoryId }) => {
      if (!categoryId) return;

      const response = await fetch(`/api/subcategories?categoryId=${categoryId}`);
      const { data: subcategories } = await response.json();

      form.resetField("subcategoryId");

      return subcategories as Subcategory[];
    },
    { revalidateOnFocus: false },
  );

  const series = useSWR(
    { brandId },
    async ({ brandId }) => {
      if (!brandId) return;

      const response = await fetch(`/api/series?brandId=${brandId}`);
      const { data: series } = await response.json();

      form.resetField("seriesId");

      return series as Series[];
    },
    { revalidateOnFocus: false },
  );

  const onSubmit = async (values: ProductSchema) => {
    const { data, success, error } = await updateProduct(product.id, values);

    if (success) {
      form.reset();
      toast.success(success);
      router.push(`/products/${data?.productId}`);
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
          <FormInput name="name" label="Name" />
          <FormInputSlug watchName="name" />
          <div className="grid grid-cols-2 grid-rows-2 gap-8">
            <FormSelect
              name="categoryId"
              label="Category"
              placeholder="Select a category"
              values={categories.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
            />
            <FormSelect
              name="subcategoryId"
              label="Subcategory"
              placeholder="Select a subcategory"
              values={subcategories.data
                ? subcategories.data.map(({ id, name }) => ({
                  label: name,
                  value: id,
                })) : []
              }
              disabled={!subcategories.data || subcategories.isLoading || subcategories.data?.length === 0}
            />
            <FormSelect
              name="brandId"
              label="Brand"
              placeholder="Select a brand"
              values={brands.map(({ id, name }) => ({
                label: name,
                value: id,
              }))}
            />
            <FormSelect
              name="seriesId"
              label="Series"
              placeholder="Select a series"
              values={series.data
                ? series.data.map(({ id, name }) => ({
                  label: name,
                  value: id,
                })) : []
              }
              disabled={!series.data || series.isLoading || series.data?.length === 0}
            />
          </div>
        </div>
        <FormInput name="model" label="Model" />
        <FormTextarea
          name="description"
          label="Description"
        />
        <FormInput name="videoUrl" label="Video Link" />
        <FormSwitch
          name="isArchived"
          label="Archived"
        />
        <FormSwitch
          name="isFeatured"
          label="Featured"
          description="Feature this product on the store's front page."
        />
        <SubmitButton className="ml-auto">
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}