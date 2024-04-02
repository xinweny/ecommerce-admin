import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({ children }: any) {
  return (
    <div className="flex h-full">
      <Sidebar className="border-r fixed top-0 left-0" />
      <div className="ml-[270px] flex-grow flex-col">
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