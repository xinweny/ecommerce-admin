"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Billboard } from "@prisma/client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { deleteBillboard } from "@/actions/billboard";

interface DeleteBillboardButtonProps {
  billboard: Billboard;
}

export function DeleteBillboardButton({
  billboard,
}: DeleteBillboardButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDelete = async () => {
    const { success, error } = await deleteBillboard(billboard.id);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success(success);
      redirect(`/dashboard/${billboard.storeId}/billboards`);
    }
  };

  return (
    <>
      <AlertModal
        title={`Delete billboard ${billboard.label} ?`}
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); }}
        onConfirm={onDelete}
      />
      <Button
        variant="destructive"
        size="icon"
        onClick={() => { setIsOpen(true); }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
}