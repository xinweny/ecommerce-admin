import { redirect } from "next/navigation";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { UpdateProductForm } from "./_components/update-product-form";

import { getProductById } from "@/db/query/product";
import { getCategories } from "@/db/query/category";
import { getBrands } from "@/db/query/brand";

interface UpdateProductPageProps {
  searchParams: { productId: string };
}

export default async function UpdateProductPage({
  searchParams: { productId },
}: UpdateProductPageProps) {
  const product = await getProductById(+productId);

  if (!product) redirect("/products");

  const [categories, brands] = await Promise.all([
    getCategories(),
    getBrands(),
]);

  return (
    <>
      <Heading
        title="Edit Product"
        description="Edit product details"
      />
      <Separator />
      <UpdateProductForm
        product={product}
        categories={categories}
        brands={brands}
      />
    </>
  );
}