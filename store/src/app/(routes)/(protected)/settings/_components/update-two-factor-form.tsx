"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import { twoFactorSchema } from "@/schemas/settings";

import { useCurrentUser } from "@/hooks";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { updateTwoFactor } from "@/actions/settings";

export function UpdateTwoFactorForm() {
  const user = useCurrentUser();

  const { update } = useSession();

  const form = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof twoFactorSchema>) => {
    try {
      const { error, success } = await updateTwoFactor(values);

      if (error) {
        toast.error(error);
        form.reset();
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
        <span className="text-2xl font-semibold text-center">Two Factor Authentication</span>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem
                    className="flex flex-row items-center justify-between rounded-lg order p-3 shadow-sm"
                  >
                    <div className="space-y-0.5">
                      <FormLabel>Two Factor Authentication</FormLabel>
                      <FormDescription>Enable two-factor authentication (2FA) for your account.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={form.formState.isSubmitting}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}