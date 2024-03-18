"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { userInfoSchema } from "@/schemas/settings";

import { useCurrentUser } from "@/hooks";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { SubmitButton } from "@/app/_components/ui/submit-button";

import { updateUserInfo } from "@/actions/settings";
import { FormInput } from "@/app/_components/ui/form-input";

export function SettingsForm() {
  const user = useCurrentUser();

  const { update } = useSession();

  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: user?.firstName || undefined,
      lastName: user?.lastName || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof userInfoSchema>) => {
    try {
      const { error, success } = await updateUserInfo(values);

      console.log(error, success);

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
        <span className="text-2xl font-semibold text-center">Settings</span>
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
                  name="firstName"
                  label="First Name"
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                />
              </div>
            </div>
            <SubmitButton className="w-full">Save</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}