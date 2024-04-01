import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { CreateCategoryForm } from "./_components/create-category-form";

import { getBillboardsByStoreId } from "@/db/query/billboard";

interface CreateCategoryPage {
  params: { storeId: string };
}

export default async function CreateCategoryPage({
  params,
}: CreateCategoryPage) {
  const { storeId } = params;

  const billboards = await getBillboardsByStoreId(storeId);

  return (
    <>
      <Heading
        title="Create Category"
        description="Add a new product category"
      />
      <Separator />
      <CreateCategoryForm
        storeId={storeId}
        billboards={billboards}
      />
    </>
  );
}