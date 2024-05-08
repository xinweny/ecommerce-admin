"use client";

import { Prisma } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  LucideIcon,
} from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  limitSchema,
  LimitSchema,
} from "@/schemas/query";

import { useQueryString } from "@/hooks";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
} from "./form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { Input } from "./input";

interface DataTableFilter {
  name: string;
  label: string;
  values: {
    label: string;
    value: any;
  }[];
}
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  queryForm: React.ReactNode;
}
 
export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  queryForm,
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
      <div className="flex items-center justify-between flex-wrap">
        {queryForm}
        <span className="text-xs text-muted-foreground mb-4 mx-2 self-end">
          {`${table.getRowCount()} of ${totalCount} items`}
        </span>
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
      <div className="flex items-center justify-between flex-wrap-reverse">
        <DataTableRowLimit />
        <DataTablePagination
          totalCount={totalCount}
          className="mt-4"
        />        
      </div>
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

interface DataTableQueryFormProps {
  children: React.ReactNode;
}

export function DataTableQueryForm({
  children,
}: DataTableQueryFormProps) {
  const form = useForm();

  const { navigateQueryString } = useQueryString();

  const onSubmit = (data: any) => {
    navigateQueryString(data);
  };

  return (
    <form
      className="flex items-center py-4 gap-4 flex-wrap"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        {children}
        <Button variant="secondary" type="submit">Search</Button>
      </Form>
    </form>
  );
}

interface DataTableSearchProps {
  name?: string;
  placeholder?: string;
}

export function DataTableSearch({
  name = "query",
  placeholder = "Search",
}: DataTableSearchProps) {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
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
  );
}

interface DataTableFiltersProps {
  filters: DataTableFilter[];
}

export function DataTableFilters({
  filters,
}: DataTableFiltersProps) {
  const searchParams = useSearchParams();

  const {
    control,
    formState: { isSubmitting },
    setValue,
  } = useFormContext();

  filters.forEach(({ name }) => {
    setValue(name, searchParams.get(name) || "");
  });

  return (
    <>
      {filters.map(({ name, label, values }) => (
        <FormField
          key={name}
          control={control}
          name={name as any}
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={isSubmitting}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      ref={field.ref}
                      defaultValue={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">{`All ${label}`}</SelectItem>
                  {values.map(({ value, label }) => (
                    <SelectItem key={value} value={value.toString()}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      ))}
    </>
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
    <Pagination {...props} className="mt-0">
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

export function DataTableRowLimit() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");

  const form = useForm<LimitSchema>({
    resolver: zodResolver(limitSchema),
    defaultValues: {
      limit: limit ? +limit : 20,
    },
  });

  const { navigateQueryString } = useQueryString();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = (data: LimitSchema) => {
    navigateQueryString({ limit: data.limit.toString() });
  };

  return (
    <form
      className="flex items-center py-4 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <FormField
          control={control}
          name="limit"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Input
                  className="w-[80px]"
                  type="number"
                  {...field}
                  disabled={isSubmitting}
                  onChange={event => field.onChange(+event.target.value)}
                  min={10}
                  max={500}
                />
              </FormControl>
              <FormLabel className="text-muted-foreground whitespace-nowrap mt-0 text-xs">
                items per page
              </FormLabel>
            </FormItem>
          )}
        />
      </Form>
    </form>
  );
}