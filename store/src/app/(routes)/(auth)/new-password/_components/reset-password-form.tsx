"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "@/schemas/auth";

import { resetPassword } from "@/actions/auth";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/form/submit-button";

import { FormInput } from "../../_components/form-input";
import { FormFeedback } from "../../_components/form-feedback";
import { CardWrapper } from "../../_components/card-wrapper";

export function ResetPasswordForm() {
  const [success, setSuccess] = useState<string>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
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