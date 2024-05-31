import { LoginForm } from "./_components/login-form";

interface LoginPageProps {
  searchParams: { [key: string]: string };
}

export default function LoginPage({
  searchParams: { callbackUrl },
}: LoginPageProps) {
  return (
    <LoginForm callbackUrl={callbackUrl} />
  );
}