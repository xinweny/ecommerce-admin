import { redirect } from "next/navigation";

import { getStoreById } from "@/db/query/store";

import { UpdateStoreForm } from "../_components/update-store-form";

interface StoreSettingsPageProps {
  params: { storeId: string };
};

export default async function StoreSettingsPage({
  params,
}: StoreSettingsPageProps) {
  const store = await getStoreById(params.storeId);

  if (!store) redirect("/dashboard");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UpdateStoreForm store={store} />
      </div>
    </div>
  );
}