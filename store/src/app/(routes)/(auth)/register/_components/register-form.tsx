"use client";

import { useTransition, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { FormInput } from "@/app/_components/ui/form-input";
import { FormMessage } from "@/app/_components/ui/form-message";
import { CardWrapper } from "../../_components/card-wrapper";

import { register } from "@/actions/auth";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await register(values);

      setError(data.error);
      setSuccess(data.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <FormInput
                control={form.control}
                name="firstName"
                label="First Name"
                disabled={isPending}
                placeholder="Johann"
              />
              <FormInput
                control={form.control}
                name="lastName"
                label="Last Name"
                disabled={isPending}
                placeholder="Strauss"
              />
            </div>
            <FormInput
              control={form.control}
              name="email"
              type="email"
              label="Email"
              disabled={isPending}
              placeholder="johannstrauss@waltz.com"
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
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
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}