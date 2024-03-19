"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "@/schemas/auth";

import { login } from "@/actions/auth";

import { Form } from "@/components/ui/form";

import { FormFeedback } from "@/app/_components/ui/form-feedback";
import { FormInput } from "@/app/_components/ui/form-input";
import { SubmitButton } from "@/app/_components/ui/submit-button";
import { CardWrapper } from "../../_components/card-wrapper";
import { ForgotPasswordLink } from "./forgot-password-link";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      twoFactorCode: undefined,
    },
  });

  const email = form.watch("email");

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { data, success, error } = await login(values, callbackUrl);

    if (error) {
      form.reset();
      form.setError("root.serverError", { message: error });
      return;
    }

    if (data?.isTwoFactor) {
      setShowTwoFactor(true);
      return;
    }

    form.reset();
    toast.success(success as string);
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
            {showTwoFactor
              ? (
                <FormInput
                  name="twoFactorCode"
                  label="Security Code"
                  description={`Security code sent to ${email}. Please enter the 6-digit code.`}
                  placeholder={"000000"}
                />
              )
              : (
              <>
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
              </>
            )
            }
          </div>
          <FormFeedback />
          <SubmitButton className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}