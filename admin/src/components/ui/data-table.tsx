"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "./button";
import { Input } from "./input";
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  totalCount: number;
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  totalCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
    manualPagination: true,
    manualSorting: true,
    rowCount: totalCount,
  });
 
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={`Search ${searchKey}`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn(searchKey)?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        totalCount={totalCount}
        className="mt-4"
      />
    </div>
  );
}

interface ToggleSortProps<TData, TValue> {
  column: Column<TData, TValue>;
  label: string;
};

export function ToggleSort<TData, TValue>({
  column,
  label,
}: ToggleSortProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        column.toggleSorting(column.getIsSorted() === "asc", true);
      }}
    >
      <span>{label}</span>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

interface DataTablePaginationProps extends React.ComponentProps<"nav"> {
  totalCount: number;
}

export function DataTablePagination({
  totalCount,
  ...props
}: DataTablePaginationProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const totalPages = Math.ceil(totalCount / limit);

  const isWithinRange = page > 1 && page < totalPages;

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${pathname}?page=${page - 1}&limit=${limit}`}
            aria-disabled={!isWithinRange}
            tabIndex={!isWithinRange ? -1 : undefined}
            className={!isWithinRange
              ? "pointer-events-none opacity-50"
              : undefined
            }
            />
        </PaginationItem>
        {Array.from(Array(totalPages).keys()).map(i => {
          const n = i + 1;

          return (
            <PaginationItem key={n}>
              <PaginationLink
                href={`${pathname}?page=${n}&limit=${limit}`}
                isActive={page === n}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={`${pathname}?page=${page + 1}&limit=${limit}`}
            aria-disabled={!isWithinRange}
            tabIndex={!isWithinRange ? -1 : undefined}
            className={!isWithinRange
              ? "pointer-events-none opacity-50"
              : undefined
            }
            />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}