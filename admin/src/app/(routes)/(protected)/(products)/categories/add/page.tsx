import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { CreateCategoryForm } from "./_components/create-category-form";

import { getBillboards } from "@/db/query/billboard";

export default async function CreateCategoryPage() {
  const billboards = await getBillboards();

  return (
    <>
      <Heading
        title="Create Category"
        description="Add a new product category"
      />
      <Separator />
      <CreateCategoryForm billboards={billboards} />
    </>
  );
}