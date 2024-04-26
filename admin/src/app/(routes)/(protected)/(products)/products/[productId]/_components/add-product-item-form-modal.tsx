"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Modal } from "@/components/modals/modal";
import { Button } from "@/components/ui/button";

export function AddProductItemFormModal() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add Product Item"
      description=""
      trigger={<Button>
        <Plus className="mr-2 h-4 w-4" />
        <span>New Product Item</span>
      </Button>}
    >
      <p>hi</p>
    </Modal>
  );
}