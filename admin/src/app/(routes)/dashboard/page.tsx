import { LogoutButton } from "@/app/_components/auth/logout-button";

export default async function DashboardPage() {
  return (
    <div>
      <span>Dashboard</span>
      <LogoutButton>Log Out</LogoutButton>
    </div>
  );
}