import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";

export default function HomePage() {
  return (
    <main>
      <span>Store</span>
      <LoginButton>Login</LoginButton>
      <LogoutButton>Logout</LogoutButton>
    </main>
  );
}
