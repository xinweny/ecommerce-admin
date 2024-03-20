"use client";

import toast from "react-hot-toast";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/hooks";

import { reset } from "@/actions/auth/reset";

export function SendResetEmailLink() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(async () => {
      if (!user?.email) return;

      const { error, success } = await reset({ email: user.email });

      if (error) toast.error(error);
      if (success) toast.success(success, {
        duration: 30000,
      });
    });
  };

  return (
    <Button
      type="button"
      variant="link"
      onClick={onClick}
      disabled={isPending}
      className="px-0 text-xs"
    >
      Forgot your current password?
    </Button>
  );
}