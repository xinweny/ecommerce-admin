import { LogoutButton } from "@/components/auth/logout-button";
import { CreateStoreButton } from "./_components/create-store-button";

export default async function DashboardPage() {
  return (
    <div>
      <span>Dashboard</span>
      <CreateStoreButton />
      <LogoutButton>Log Out</LogoutButton>
    </div>
  );
}