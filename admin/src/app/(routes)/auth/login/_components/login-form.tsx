"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { loginSchema, type LoginSchema } from "@/schemas/auth";

import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/form/form-input";
import { FormFeedback } from "@/components/form/form-feedback";
import { SubmitButton } from "@/components/form/submit-button";
import { CardWrapper } from "./card-wrapper";

import { login } from "@/actions/auth";

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const { error, success } = await login(values);
    
    if (error) {
      form.reset();
      form.setError("root.serverError", { message: error });
      return;
    }

    form.reset();
    toast.success(success as string);
  };

  return (
    <CardWrapper headerLabel="Login">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="johannstrauss@waltz.com"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
            />
          </div>
          <FormFeedback />
          <SubmitButton className="w-full">
            Login
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}