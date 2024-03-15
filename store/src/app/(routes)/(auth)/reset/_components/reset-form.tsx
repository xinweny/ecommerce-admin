"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/app/_components/ui/form-input";
import { FormError } from "@/app/_components/ui/form-error";
import { FormSuccess } from "@/app/_components/ui/form-success";
import { SubmitButton } from "@/app/_components/ui/submit-button";
import { CardWrapper } from "../../_components/card-wrapper";

import { reset } from "@/actions/auth";

export function ResetForm() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    const data = await reset(values);

    setError(data.error);
    setSuccess(data.success);
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormInput
            name="email"
            type="email"
            label="Email"
            placeholder="johannstrauss@waltz.com"
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <SubmitButton className="w-full">
            Send Reset Email
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}