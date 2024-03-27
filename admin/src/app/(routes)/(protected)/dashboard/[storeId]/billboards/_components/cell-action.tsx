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
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { BillboardRow } from "./columns";

interface CellActionProps {
  data: BillboardRow;
}

export function CellAction({
  data,
}: CellActionProps) {
  const router = useRouter();
  const params = useParams();

  const { id } = data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => {
          navigator.clipboard.writeText(id);
          toast.success(`Billboard ID ${id} copied!`);
        }}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          router.push(`/dashboard/${params.storeId}/billboards/${id}`);
        }}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}