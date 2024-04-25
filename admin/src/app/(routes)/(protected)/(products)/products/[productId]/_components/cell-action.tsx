"use client";

import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Edit,
  Trash,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertModalContent } from "@/components/modals/alert-modal";

import { ProductItemRow } from "./columns";

interface CellActionProps {
  data: ProductItemRow;
}

export function CellAction({
  data,
}: CellActionProps) {
  const router = useRouter();

  const onDelete = async () => {
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => {
            router.push(`/products/edit?productId=${data.id}`);
          }}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
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
    </AlertDialog>
  );
}