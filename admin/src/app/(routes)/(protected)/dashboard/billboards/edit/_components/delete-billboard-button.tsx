"use client";

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
  const onDelete = async () => {
    const { success, error } = await deleteBillboard(billboard.id);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success(success);
      redirect("/dashboard/billboards");
    }
  };

  return (
    <AlertModal
      title={`Delete billboard ${billboard.label} ?`}
      onConfirm={onDelete}
    >
      <Button
        variant="destructive"
        size="icon"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </AlertModal>
  );
}