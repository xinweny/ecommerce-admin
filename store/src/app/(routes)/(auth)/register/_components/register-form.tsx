"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";
import { SubmitButton } from "@/components/form/submit-button";
import { FormInput } from "@/components/form/form-input";
import { FormFeedback } from "@/components/form/form-feedback";

import { CardWrapper } from "../../_components/card-wrapper";

import { register } from "@/actions/auth/register";

export function RegisterForm() {
  const [success, setSuccess] = useState<string>();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setSuccess(undefined);

    const { error, success } = await register(values);

    if (error) {
      form.setError("root.serverError", { message: error });
      return;
    }
    
    setSuccess(success);
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
                name="firstName"
                label="First Name"
                placeholder="Johann"
              />
              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Strauss"
              />
            </div>
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="johannstrauss@waltz.com"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
            />
          </div>
          <FormFeedback success={success} />
          <SubmitButton className="w-full">
            Register
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}