"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { dateRangeSchema, type DateRangeSchema } from "@/schemas/query";

import { Form } from "@/components/ui/form";

import { FormDateRange } from "@/components/form/form-date";
import { Button } from "@/components/ui/button";

export function DateRangeForm() {
  const form = useForm<DateRangeSchema>({
    defaultValues: {
      dateRange: {},
    },
    resolver: zodResolver(dateRangeSchema),
  });

  const onSubmit = (values: DateRangeSchema) => {

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <FormDateRange name="dateRange" />
        <Button>Search</Button>
      </form>
    </Form>
  );
}