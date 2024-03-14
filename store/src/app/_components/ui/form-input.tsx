import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export function FormInput({
  name,
  label,
  type,
  placeholder,
}: FormInputProps) {
  const methods = useFormContext();

  if (!methods) return null;

  const {
    control,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
  )
}