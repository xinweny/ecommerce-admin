import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({ children }: any) {
  return (
    <div className="flex h-full">
      <Sidebar className="border-r" />
      <div className="flex-grow">
        <Navbar />
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}