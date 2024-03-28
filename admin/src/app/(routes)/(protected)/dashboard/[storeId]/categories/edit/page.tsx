import { redirect } from "next/navigation";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { getCategoryById } from "@/db/query/category";
import { getBillboardsByStoreId } from "@/db/query/billboard";
import { UpdateCategoryForm } from "./_components/update-category-form";

interface UpdateCategoryPage {
  params: { storeId: string };
  searchParams: { categoryId: string };
}

export default async function UpdateCategoryPage({
  searchParams,
  params,
}: UpdateCategoryPage) {
  const { storeId } = params;
  const { categoryId } = searchParams;

  const category = await getCategoryById(categoryId);

  if (!category) redirect(`/dashboard/${storeId}/categories`);

  const billboards = await getBillboardsByStoreId(storeId);

  return (
    <>
      <Heading title="Edit Category" description={`Manage ${category.name}`} />
      <Separator />
      <UpdateCategoryForm
        category={category}
        billboards={billboards}
      />
    </>
  );
}