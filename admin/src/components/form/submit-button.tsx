import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function SubmitButton({
  className,
  children,
}: SubmitButtonProps) {
  const methods = useFormContext();

  return (
    <Button
      type="submit"
      className={className}
      disabled={methods
        ? methods.formState.isSubmitting
        : true
      }
    >
      {children}
    </Button>
  );
}