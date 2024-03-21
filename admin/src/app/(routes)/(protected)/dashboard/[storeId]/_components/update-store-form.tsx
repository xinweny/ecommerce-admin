"use client";

import { Store } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { FormHeader } from "@/components/form/form-header";

import { DeleteStoreButton } from "./delete-store-button";

interface UpdateStoreFormProps {
  store: Store;
}

export function UpdateStoreForm({ store }: UpdateStoreFormProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <FormHeader title="Settings" description="Manage store preferences" />
        <DeleteStoreButton storeId={store.id} />
      </div>
      <Separator />
    </>
  );
}