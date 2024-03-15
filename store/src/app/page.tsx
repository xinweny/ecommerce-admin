import { LoginButton } from "./_components/auth/login-button";
import { LogoutButton } from "./_components/auth/logout-button";

export default function Home() {
  return (
    <main>
      Store
      <LoginButton>Login</LoginButton>
      <LogoutButton>Logout</LogoutButton>
    </main>
  );
}
