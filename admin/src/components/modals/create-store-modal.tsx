"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createStoreSchema } from "@/schemas/store";

import { useStoreModal } from "@/hooks";

import { Modal } from "./modal";

export function CreateStoreModal() {
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema)
  });

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