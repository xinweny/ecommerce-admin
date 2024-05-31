import { ResetPasswordForm } from "./_components/reset-password-form";

interface PasswordPageProps {
  searchParams: { [key: string]: string };
}

export default function PasswordPage({
  searchParams: { token },
}: PasswordPageProps) {
  return (
    <ResetPasswordForm token={token} />
  );
}