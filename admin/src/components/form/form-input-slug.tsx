import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

import { FormInput } from "./form-input";

interface FormInputSlugProps {
  watchName: string;
  name?: string;
  label?: string;
  description?: string;
}

export function FormInputSlug({
  watchName,
  name = "slug",
  label = "URL Slug",
  description = "A URL-friendly name, containing only lowercase letters and hyphens.",
}: FormInputSlugProps) {
  const { watch, setValue } = useFormContext();

  const watchField = watch(watchName);

  useEffect(() => {
    setValue("slug", watchField.toLowerCase().replace(" ", "-"));
  }, [setValue, watchField]);

  return (
    <FormInput
      name={name}
      label={label}
      description={description}
    />
  );
}