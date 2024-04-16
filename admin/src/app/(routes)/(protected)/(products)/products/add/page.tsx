import { getCategories } from "@/db/query/category";
import { getBrands } from "@/db/query/brand";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { CreateProductForm } from "./_components/create-product-form";

export default async function CreateProductPage() {
  const [categories, brands] = await Promise.all([
      getCategories(),
      getBrands(),
  ]);

  return (
    <>
      <Heading
        title="Create Product"
        description="Add a new store product"
      />
      <Separator />
      <CreateProductForm
        categories={categories}
        brands={brands}
      />
    </>
  );
}