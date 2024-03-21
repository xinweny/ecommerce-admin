import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
}

export function FormInput({
  name,
  label,
  type,
  placeholder,
  description,
}: FormInputProps) {
  const form = useFormContext();

  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={isSubmitting}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}