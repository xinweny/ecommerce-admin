import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-full">
      <Sidebar className="border-r" />
      <div className="flex-grow flex-col overflow-y-auto">
        <Navbar />
        <div className="flex-col flex-grow overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}