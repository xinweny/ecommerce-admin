"use client";
 
import { ColumnDef } from "@tanstack/react-table";

interface BillboardColumn {
  id: string;
  label: string;
  createdAt: string;
}
 
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];