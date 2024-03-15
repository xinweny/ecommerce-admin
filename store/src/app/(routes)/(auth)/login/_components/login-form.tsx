"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/auth";

import { login } from "@/actions/auth";

import { Form } from "@/components/ui/form";

import { FormMessage } from "@/app/_components/ui/form-message";
import { FormInput } from "@/app/_components/ui/form-input";
import { SubmitButton } from "@/app/_components/ui/submit-button";
import { CardWrapper } from "../../_components/card-wrapper";
import { ForgotPasswordLink } from "./forgot-password-link";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    const data = await login(values, callbackUrl);

    setError(data.error);
    setSuccess(data.success);
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="johannstrauss@waltz.com"
            />
            <div>
              <FormInput
                name="password"
                type="password"
                label="Password"
              />
              <ForgotPasswordLink />
            </div>
          </div>
          <FormMessage
            error={error || urlError}
            success={success}
          />
          <SubmitButton className="w-full">Login</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}