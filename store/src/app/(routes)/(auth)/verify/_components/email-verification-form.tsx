"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleLoader } from "react-spinners";

import { FormError, FormSuccess } from "@/components/form/form-feedback";

import { CardWrapper } from "../../_components/card-wrapper";

import { verifyEmail } from "@/actions/auth";

interface EmailVerificationFormProps {
  token?: string | null;
}

export function EmailVerificationForm({
  token = null,
}: EmailVerificationFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    try {
      const data = await verifyEmail(token);

      setSuccess(data.success);
      setError(data.error);
    } catch {
      setError("Something went wrong.");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verifying your account"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {(!success && !error) && <CircleLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}