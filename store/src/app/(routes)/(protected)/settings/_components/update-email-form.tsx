"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { emailSchema } from "@/schemas/settings";

import { useCurrentUser } from "@/hooks";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { FormInput } from "@/app/_components/ui/form-input";
import { SubmitButton } from "@/app/_components/ui/submit-button";
import { FormFeedback } from "@/app/_components/ui/form-feedback";

import { updateEmail } from "@/actions/settings/update-email";

export function UpdateEmailForm() {
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    try {
      const { error, success } = await updateEmail(values);

      if (error) {
        form.setError("root.serverError", { message: error });
        return;
      }
      
      toast.success(success as string);
    } catch {
      form.setError("root.serverError", { message: "Something went wrong." });
    }
  };

  if (user?.provider === "credentials") return null;

  return (
    <Card>
      <CardHeader>
        <span className="text-2xl font-semibold text-center">Update Email Address</span>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormInput
                name="email"
                label="Email Address"
                type="email"
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