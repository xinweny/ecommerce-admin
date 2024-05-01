import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="border-r h-full" />
      <div className="grow flex-col overflow-y-auto h-full">
        <Navbar />
        <div className="grow flex flex-col overflow-hidden">
          <div className="grow space-y-4 p-8 pb-0 pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}