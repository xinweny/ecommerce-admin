import { useState } from "react";

export const useSubmitErrorSuccess = () => {
  const error = useState<string | undefined>();
  const success = useState<string | undefined>();

  return {
    error,
    success,
  };
}