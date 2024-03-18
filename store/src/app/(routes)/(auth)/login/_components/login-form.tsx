"use client";

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
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : undefined;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { success, error } = await login(values, callbackUrl);

    if (error) {
      form.setError("root.serverError", { message: error });
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
          <FormFeedback error={urlError} />
          <SubmitButton className="w-full">Login</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}