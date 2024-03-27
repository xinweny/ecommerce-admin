"use client";

import { useRouter, useParams } from "next/navigation";
import {
  MoreHorizontal,
  Edit,
  Copy,
  Trash,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertModalContent } from "@/components/modals/alert-modal";

import { BillboardRow } from "./columns";

import { deleteBillboard } from "@/actions/billboard";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface CellActionProps {
  data: BillboardRow;
}

export function CellAction({
  data,
}: CellActionProps) {
  const router = useRouter();
  const params = useParams();

  const { id } = data;

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`Billboard ID ${id} copied!`);
  }

  const onDelete = async () => {
    const { success, error } = await deleteBillboard(data.id);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success(success);
      router.push(`/dashboard/${data.storeId}/billboards`);
    }
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
          <DropdownMenuItem onClick={() => { onCopy(id); }}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            router.push(`/dashboard/${params.storeId}/billboards/${id}`);
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
        title={`Delete billboard ${data.label} ?`}
        onConfirm={onDelete}
      />
    </AlertDialog>
  );
}