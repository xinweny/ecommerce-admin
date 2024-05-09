"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ProductItemIncludePayload } from "@/db/query/product";

import { productItemSchema, type ProductItemSchema } from "@/schemas/product";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { ImageUpload } from "@/components/form/image-upload";
import { ImagePreview } from "@/components/form/image-preview";
import { SubmitButton } from "@/components/form/submit-button";

import { updateProductItem } from "@/actions/product";

interface UpdateProductItemFormProps {
  productItem: Omit<ProductItemIncludePayload, "productId" | "createdAt" | "updatedAt">;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateProductItemForm({
  productItem,
  openModal,
  setOpenModal,
}: UpdateProductItemFormProps) {
  const router = useRouter();

  const { product } = productItem;

  const form = useForm<ProductItemSchema>({
    resolver: zodResolver(productItemSchema),
    defaultValues: {
      name: productItem.name,
      sku: productItem.sku,
      price: productItem.price,
      stock: productItem.stock,
      imageUrls: productItem.images.map(image => image.imageUrl),
      isArchived: productItem.isArchived,
    },
  });

  useEffect(() => {
    if (!openModal) form.reset();
  }, [openModal, form]);

  const onSubmit = async (values: ProductItemSchema) => {
    const { success, error } = await updateProductItem(product.id, values);

    if (success) {
      form.reset();
      toast.success(success);
      setOpenModal(false);
      router.push(`/products/${product.id}`);
    };
    if (error) toast.error(error);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormInput
          name="name"
          label="Name"
        />
        <FormInput
          name="sku"
          label="SKU"
        />
        <FormInput
          name="stock"
          label="Quantity"
          type="number"
        />
        <FormInput
          name="price"
          label="Price"
          type="number"
        />
        <ImageUpload
          name="imageUrls"
          label="Product Images"
          folder="/products"
          limit={10}
        />
        <ImagePreview
          name="imageUrls"
          containerClassName="w-[200px] h-[200px]"
        />
        <FormSelect
          name="isArchived"
          label="Archived"
          values={[
            { value: false, label: "No" },
            { value: true, label: "Yes" },
          ]}
        />
        <SubmitButton className="w-full">
          Save Changes
        </SubmitButton>
      </form>
    </Form>
  );
}