import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="border-r h-full" />
      <ScrollArea className="grow flex flex-col h-full">
        <Navbar />
        <div className="grow flex flex-col overflow-hidden">
          <div className="grow space-y-4 p-8 pb-0 pt-6">
            {children}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}