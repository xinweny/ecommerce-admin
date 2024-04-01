import { redirect } from "next/navigation";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { getCategoryById } from "@/db/query/category";
import { getBillboards } from "@/db/query/billboard";
import { UpdateCategoryForm } from "./_components/update-category-form";

interface UpdateCategoryPage {
  searchParams: { categoryId: string };
}

export default async function UpdateCategoryPage({
  searchParams,
}: UpdateCategoryPage) {
  const { categoryId } = searchParams;

  const category = await getCategoryById(+categoryId);

  if (!category) redirect("/dashboard/categories");

  const billboards = await getBillboards();

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