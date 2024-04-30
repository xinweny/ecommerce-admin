"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Edit,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertModalContent } from "@/components/modals/alert-modal";
import { 
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalContent } from "@/components/modals/modal";

import { UpdateProductItemForm } from "./update-product-item-form";
import { ProductItemRow } from "./columns";

interface CellActionProps {
  data: ProductItemRow;
}

export function CellAction({
  data,
}: CellActionProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onDelete = async () => {
  };

  return (
    <Dialog
      modal={false}
      open={openModal}
      onOpenChange={setOpenModal}
    >
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertModalContent
          title={`Delete product ${data.name}?`}
          onConfirm={onDelete}
        />
        <ModalContent
          title="Edit Product Item"
          description={data.product.name}
          disableOutsideInteraction
        >
          <UpdateProductItemForm
            productItem={data}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </ModalContent>
      </AlertDialog>
    </Dialog>
  );
}