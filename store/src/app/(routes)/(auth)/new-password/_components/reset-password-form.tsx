"use client";

import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPasswordSchema } from "@/schemas/auth";

import { resetPassword } from "@/actions/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { FormInput } from "@/app/_components/ui/form-input";
import { FormMessage } from "@/app/_components/ui/form-message";
import { CardWrapper } from "../../_components/card-wrapper";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await resetPassword(values, token);

      setError(data.error);
      setSuccess(data.success);
    });
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
              control={form.control}
              name="password"
              label="New Password"
              type="password"
              disabled={isPending}
            />
            <FormInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              disabled={isPending}
            />
          </div>
          <FormMessage error={error} success={success} />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}