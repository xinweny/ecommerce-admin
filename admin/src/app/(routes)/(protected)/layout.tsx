import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex overflow-hidden h-screen w-screen">
      <Sidebar className="border-r h-full" />
      <div className="flex-auto flex flex-col h-full overflow-hidden">
        <Navbar />
        <div className="grow flex flex-col gap-4 px-8 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}