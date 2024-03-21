"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema, type LoginSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/form/submit-button";

import { FormFeedback } from "@/components/form/form-feedback";
import { FormInput } from "@/components/form/form-input";
import { CardWrapper } from "../../_components/card-wrapper";

import { ForgotPasswordLink } from "./forgot-password-link";

import { login } from "@/actions/auth";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      twoFactorCode: undefined,
    },
  });

  const email = form.watch("email");

  const onSubmit = async (values: LoginSchema) => {
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