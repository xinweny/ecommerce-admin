"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startOfMonth,
} from "date-fns";

import { dateRangeSchema, type DateRangeSchema } from "@/schemas/query";

import { useQueryString } from "@/hooks";

import { Form } from "@/components/ui/form";

import { FormDateRange } from "@/components/form/form-date";
import { Button } from "@/components/ui/button";

export function DateRangeForm() {
  const searchParams = useSearchParams();

  const from = searchParams.get('dateRange[from]');
  const to = searchParams.get('dateRange[to]');

  const form = useForm<DateRangeSchema>({
    defaultValues: {
      dateRange: {
        from: from
          ? new Date(from)
          : startOfMonth(new Date()),
        to: to
          ? new Date(to)
          : new Date(),
      },
    },
    resolver: zodResolver(dateRangeSchema),
  });

  const { navigate } = useQueryString();

  const onSubmit = (values: DateRangeSchema) => {
    navigate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center gap-4"
      >
        <FormDateRange name="dateRange" />
        <Button>Search</Button>
      </form>
    </Form>
  );
}