import { useFormContext } from "react-hook-form";

import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

interface FormFeedbackProps {
  error?: string;
  success?: string;
}

export function FormFeedback({
  error,
  success,
}: FormFeedbackProps) {
  const { formState: { errors, isSubmitted } } = useFormContext();

  if (!isSubmitted) return null;

  if (error) return <FormError message={error} />;

  const serverError = errors.root?.serverError;
  
  return serverError
    ? <FormError message={serverError.message} />
    : <FormSuccess message={success} />;
}