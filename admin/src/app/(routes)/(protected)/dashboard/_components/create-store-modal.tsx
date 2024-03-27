"use client";

import { ModalContent } from "@/components/modals/modal";

import { CreateStoreForm } from "./create-store-form";

interface CreateStoreModalProps {
  onClose: () => void;
}

export function CreateStoreModal({
  onClose,
}: CreateStoreModalProps) {
  return (
    <ModalContent
      title="Create Store"
      description="Add a new store to manage products and categories"
    >
      <CreateStoreForm onClose={onClose} />
    </ModalContent>
  );
}