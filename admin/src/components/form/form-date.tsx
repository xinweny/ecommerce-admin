"use client"
 
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
 
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

interface FormDateRangeProps {
  name: string;
  className?: string;
} 

export function FormDateRange({
  name,
  className,
}: FormDateRangeProps) {
  const { control } = useFormContext();

  const dateFormat = "dd/LL/yyyy";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {field.value?.from
                      ? (
                        field.value.to
                          ? `${format(field.value.from, dateFormat)} - ${format(field.value.to, dateFormat)}`
                          : format(field.value.from, dateFormat)
                      )
                      : "Select date range"
                    }
                  </span>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}