"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { productItemSchema, type ProductItemSchema } from "@/schemas/product";

import { Form } from "@/components/ui/form";
import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { ImageUpload } from "@/components/form/image-upload";
import { ImagePreview } from "@/components/form/image-preview";
import { SubmitButton } from "@/components/form/submit-button";

import { createProductItem } from "@/actions/product";

interface AddProductItemFormModal {
  product: Product;
}

export function AddProductItemFormModal({
  product,
}: AddProductItemFormModal) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<ProductItemSchema>({
    resolver: zodResolver(productItemSchema),
    defaultValues: {
      name: undefined,
      sku: undefined,
      price: undefined,
      stock: undefined,
      imageUrls: [],
      isArchived: false,
    },
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  const onSubmit = async (values: ProductItemSchema) => {
    const { success, error } = await createProductItem(product.id, values);

    if (success) {
      form.reset();
      toast.success(success);
      setOpen(false);
      router.push(`/products/${product.id}`);
    };
    if (error) toast.error(error);
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add Product Item"
      description={product.name}
      trigger={<Button>
        <Plus className="mr-2 h-4 w-4" />
        <span>New Product Item</span>
      </Button>}
      modal={false}
    >
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
            Create Product Item
          </SubmitButton>
        </form>
      </Form>
    </Modal>
  );
}