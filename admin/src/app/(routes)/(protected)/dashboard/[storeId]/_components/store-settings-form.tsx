"use client";

import { useState } from "react";
import { Store } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { FormHeader } from "@/components/form/form-header";

import { DeleteStoreButton } from "./delete-store-button";
import { UpdateStoreForm } from "./update-store-form";

interface StoreSettingsFormProps {
  store: Store;
}

export function StoreSettingsForm({ store }: StoreSettingsFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <FormHeader title="Settings" description="Manage store preferences" />
        <DeleteStoreButton storeId={store.id} />
      </div>
      <Separator />
      <UpdateStoreForm store={store} />
    </>
  );
}