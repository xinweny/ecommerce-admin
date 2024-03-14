import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

interface FormMessageProps {
  error?: string;
  success?: string;
}

export function FormMessage({
  error,
  success,
}: FormMessageProps) {
  return (
    <>
      <FormError message={error} />
      <FormSuccess message={success} />
    </>
  );
}