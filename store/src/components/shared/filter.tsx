"use client";

import { useEffect } from "react";
import { Route } from "next";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "qs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { stringIdsStore, type StringIdsStore } from "@/schemas/filters";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface SelectFilterProps {
  values: {
    label: string;
    value: string;
  }[];
  name: string;
  title: string;
}

export function SelectFilter({
  values,
  name,
  title,
}: SelectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<StringIdsStore>({
    defaultValues: {
      [name]: [],
    },
    resolver: zodResolver(stringIdsStore),
  });
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: StringIdsStore) => {
    const currentParams = qs.parse(searchParams.toString());

    const query = {
      ...currentParams,
      [name]: data[name].length > 0
        ? JSON.stringify(data[name])
        : null,
    };

    const url = `${pathname}?${qs.stringify(query, { skipNulls: true })}`;

    router.push(url as Route, { scroll: false });
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());

    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <Form {...form}>
      <form>
        <h3 className="font-semibold">{title}</h3>
        {values.map(({ label, value }) => (
          <FormField
            key={value}
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div key={value} className="flex gap-2 items-center">
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, value])
                          : field.onChange(field.value?.filter((v: string) => v !== value));
                      }}
                      disabled={isSubmitting}
                    />
                    <FormLabel className="text-sm">{label}</FormLabel>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}