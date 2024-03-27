import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

interface CancelButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function CancelButton({
  className,
  children,
  onClick,
}: CancelButtonProps) {
  const methods = useFormContext();

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      disabled={methods
        ? methods.formState.isSubmitting
        : true
      }
      onClick={() => {
        methods.reset();
        if (onClick) onClick();
      }}
    >
      {children}
    </Button>
  );
}