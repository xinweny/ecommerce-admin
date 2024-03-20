"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";

import { reset } from "@/actions/auth";

import { FormInput } from "@/components/form/form-input";
import { FormFeedback } from "@/components/form/form-feedback";
import { SubmitButton } from "@/components/form/submit-button";
import { CardWrapper } from "@/components/auth/card-wrapper";

export function ResetForm() {
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetSchema>) => {

    setSuccess(undefined);

    const { error, success } = await reset(values);

    if (error) {
      form.setError("root.serverError", { message: error });
      return;
    }

    setSuccess(success);
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
          <FormFeedback success={success} />
          <SubmitButton className="w-full">
            Send Reset Email
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}