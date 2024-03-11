import { auth, signOut } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <span>Dashboard</span>
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}