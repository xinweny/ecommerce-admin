"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { emailSchema } from "@/schemas/settings";

import { useCurrentUser } from "@/hooks";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { FormInput } from "@/app/(routes)/(auth)/_components/form-input";
import { SubmitButton } from "@/components/form/submit-button";
import { FormFeedback } from "@/app/(routes)/(auth)/_components/form-feedback";

import { updateEmail } from "@/actions/settings";

export function UpdateEmailForm() {
  const user = useCurrentUser();

  const { update } = useSession();

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

      await update();
      
      toast.success(success as string);
    } catch {
      form.setError("root.serverError", { message: "Something went wrong." });
    }
  };

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