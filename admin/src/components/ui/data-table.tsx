"use client";

import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  LucideIcon,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { searchSchema, SearchSchema } from "@/schemas/search";

import { useQueryString } from "@/hooks";
 
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
import {
  Form,
  FormItem,
  FormField,
  FormControl,
} from "@/components/ui/form";

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    rowCount: totalCount,
  });
 
  return (
    <div>
      <DataTableSearch />
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
  const { navigateQueryString } = useQueryString();

  const searchParams = useSearchParams();

  const sortValue = searchParams.get(column.id);

  const SortIcon: LucideIcon = (!sortValue || !(sortValue in Prisma.SortOrder))
  ? ArrowUpDown
  : (sortValue === Prisma.SortOrder.asc
    ? ArrowUp
    : ArrowDown
  );

  return (
    <Button
      variant="ghost"
      onClick={() => {
        navigateQueryString({
          [column.id]: (!sortValue || !(sortValue in Prisma.SortOrder))
            ? Prisma.SortOrder.asc
            : (sortValue === Prisma.SortOrder.asc
              ? Prisma.SortOrder.desc
              : Prisma.SortOrder.asc
            ),
        });
      }}
      onDoubleClick={() => {
        navigateQueryString({ [column.id]: null });
      }}
    >
      <span>{label}</span>
      <SortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}

interface DataTableSearchProps {
  placeholder?: string;
}

export function DataTableSearch({
  placeholder = "Search",
}: DataTableSearchProps) {
  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const { navigateQueryString } = useQueryString();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = (data: SearchSchema) => {
    const { query } = data;

    navigateQueryString({
      query: query ? query : null,
    });
  };

  return (
    <form
      className="flex items-center py-4 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <FormField
          control={control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder={placeholder}
                />
              </FormControl>
              
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">Search</Button>
      </Form>
    </form>
  );
}

interface DataTablePaginationProps extends React.ComponentProps<"nav"> {
  totalCount: number;
}

export function DataTablePagination({
  totalCount,
  ...props
}: DataTablePaginationProps) {
  const { createQueryString } = useQueryString();

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
            href={createQueryString({
              page: (page - 1).toString(),
              limit: limit.toString(),
            })}
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
                href={createQueryString({
                  page: page.toString(),
                  limit: limit.toString(),
                })}
                isActive={page === n}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={createQueryString({
              page: (page + 1).toString(),
              limit: limit.toString(),
            })}
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