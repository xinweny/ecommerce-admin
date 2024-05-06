"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { ToggleSort } from "@/components/ui/data-table";

import { CellAction } from "./cell-action";

export interface ReviewRow {
  id: number;
  rating: number;
  user: {
    id: string;
    name: string;
  };
  comment: string | null;
  createdAt: Date;
}

export const columns: ColumnDef<ReviewRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="ID"
      />
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Rating"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <ToggleSort
        column={column}
        label="Posted"
      />
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];