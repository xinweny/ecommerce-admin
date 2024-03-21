"use client";

import { Store } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { FormHeader } from "@/components/form/form-header";

import { DeleteStoreButton } from "./delete-store-button";
import { UpdateStoreForm } from "./update-store-form";

interface StoreSettingsFormProps {
  store: Store;
}

export function StoreSettingsForm({ store }: StoreSettingsFormProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <FormHeader title="Settings" description="Manage store preferences" />
        <DeleteStoreButton store={store} />
      </div>
      <Separator />
      <UpdateStoreForm store={store} />
    </>
  );
}