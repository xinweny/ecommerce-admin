"use client";

import { useStoreModal } from "@/hooks";

import { Modal } from "@/components/ui/modal";

export function CreateStoreModal() {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      
    </Modal>
  );
}