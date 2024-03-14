"use client";

import { useTransition, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import { SettingsSchema } from "@/schemas";

import { useCurrentUser } from "@/hooks";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormError } from "@/app/_components/ui/form-error";
import { FormSuccess } from "@/app/_components/ui/form-success";

import { settings } from "@/actions/auth";

export function SettingsForm() {
  const user = useCurrentUser();

  const { update } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      firstName: user?.firstName || undefined,
      lastName: user?.lastName || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      try {
        const data = await settings(values);

        if (data.error) {
          setError(data.error);
          return;
        }
        
        await update();
        
        setSuccess(data.success);
      } catch {
        setError("Something went wrong.");
      }
    });
  };

  return (
    <Card className="w-[600px">
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}