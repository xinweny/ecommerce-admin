import { useFormContext } from "react-hook-form";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export function FormError({
  message,
}: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}


interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({
  message,
}: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

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