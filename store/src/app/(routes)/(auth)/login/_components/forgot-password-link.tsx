import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ForgotPasswordLink() {
  return (
    <Button
      size="sm"
      variant="link"
      asChild
      className="px-0 font-normal"
    >
      <Link href="/reset">Forgot your password?</Link>
    </Button>
  );
}