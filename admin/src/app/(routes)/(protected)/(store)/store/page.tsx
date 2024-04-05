import { redirect } from "next/navigation";

import { getStoreById } from "@/db/query/store";

import { Heading } from "@/components/shared/heading";
import { Separator } from "@/components/ui/separator";

import { UpdateStoreForm } from "./_components/update-store-form";

export default async function StoreSettingsPage() {
  const store = await getStoreById(1);

  if (!store) return <></>;

  return (
    <>
      <Heading title="Store Settings" description="Manage store preferences" />
      <Separator />
      <UpdateStoreForm store={store} />
    </>
  );
}