"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { passwordSchema } from "@/schemas/settings";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/form/form-input";
import { SubmitButton } from "@/components/form/submit-button";
import { SendResetEmailLink } from "./send-reset-email-link";
import { FormFeedback } from "@/components/form/form-feedback";

import { updatePassword } from "@/actions/settings";

export function UpdatePasswordForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const { error, success } = await updatePassword(values);

      if (error) {
        form.setError("root.serverError", { message: error });
        return;
      }
      
      toast.success(success as string);
    } catch {
      form.setError("root.serverError", { message: "Something went wrong." });
    }
  };

  return (
    <Card>
      <CardHeader>
        <span className="text-2xl font-semibold text-center">Update Password</span>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <div>
                <FormInput
                  name="oldPassword"
                  label="Current Password"
                  type="password"
                />
                <SendResetEmailLink />
              </div>
              <FormInput
                name="newPassword"
                label="New Password"
                type="password"
              />
              <FormInput
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
              />
            </div>
            <FormFeedback />
            <SubmitButton className="w-full">Update</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}