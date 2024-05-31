"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema, type ResetPasswordSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/form/submit-button";
import { FormInput } from "@/components/form/form-input";
import { FormFeedback } from "@/components/form/form-feedback";

import { CardWrapper } from "../../_components/card-wrapper";

import { resetPassword } from "@/actions/auth";

interface ResetPasswordFormProps {
  token?: string | null;
}

export function ResetPasswordForm({
  token = null,
}: ResetPasswordFormProps) {
  const [success, setSuccess] = useState<string>();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordSchema) => {
    setSuccess(undefined);

    const { error, success } = await resetPassword(values, token);

    if (error) {
      form.setError("root.serverError", { message: error });
      return;
    }
    
    setSuccess(success);
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
          <FormFeedback success={success} />
          <SubmitButton className="w-full">Reset Password</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}