"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleLoader } from "react-spinners";

import { verifyEmail } from "../_actions/verify-email";

import { FormError } from "@/app/_components/ui/form-error";
import { FormSuccess } from "@/app/_components/ui/form-success";

import { CardWrapper } from "../../_components/card-wrapper";

export function EmailVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

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