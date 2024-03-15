"use client";

import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPasswordSchema } from "@/schemas/auth";

import { resetPassword } from "@/actions/auth";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/app/_components/ui/form-input";
import { FormMessage } from "@/app/_components/ui/form-message";
import { CardWrapper } from "../../_components/card-wrapper";
import { SubmitButton } from "@/app/_components/ui/submit-button";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    const data = await resetPassword(values, token);

    setError(data.error);
    setSuccess(data.success);
  };

  return (
    <CardWrapper
      headerLabel="Reset your password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              name="password"
              label="New Password"
              type="password"
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          </div>
          <FormMessage error={error} success={success} />
          <SubmitButton className="w-full">Reset Password</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}