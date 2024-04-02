import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/theme/mode-toggle";

import { MainNav } from "./main-nav";

export async function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}