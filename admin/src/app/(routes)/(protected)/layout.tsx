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
      <div className="flex-auto flex flex-col h-full overflow-y-auto">
        <Navbar />
        <div className="grow flex flex-col gap-4 p-8 pb-0 pt-6 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}