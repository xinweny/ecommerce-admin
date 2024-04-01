import { NavBar } from "./_components/nav-bar";

export default async function DashboardLayout({ children }: any) {
  return (
    <>
      <NavBar />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
      </div>
    </>
  );
}