import { redirect } from "next/navigation";

import { getBillboardByStoreId } from "@/db/query/billboard";
import { getStoreById } from "@/db/query/store";

import { FormHeader } from "@/components/form/form-header";
import { Separator } from "@/components/ui/separator";

import { UpsertBillboardForm } from "./_components/upsert-billboard-form";

interface StoreDisplayPageProps {
  params: { storeId: string };
}

export default async function StoreDisplayPage({ params }: StoreDisplayPageProps) {
  const { storeId } = params;

  const store = await getStoreById(storeId);

  if (!store) redirect("/dashboard");

  const billboard = await getBillboardByStoreId(storeId);

  return (
    <>
      <div className="flex items-center justify-between">
        <FormHeader
          title="Billboard"
          description="Manage your store's billboard"
        />
        
      </div>
      <Separator />
      <UpsertBillboardForm
        storeId={storeId}
        billboard={billboard}
      />
    </>
  );
}