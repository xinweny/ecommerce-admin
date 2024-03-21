import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

export function FormTextarea({
  name,
  label,
  placeholder,
  description,
}: FormInputProps) {
  const methods = useFormContext();

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
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <Textarea
              {...field}
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