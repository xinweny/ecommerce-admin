import { EmailVerificationForm } from "./_components/email-verification-form";

interface VerifyPageProps {
  searchParams: { [key: string]: string };
}

export default function VerifyPage({
  searchParams: { token },
}: VerifyPageProps) {
  return (
    <EmailVerificationForm token={token} />
  );
}