import { getStoresByCurrentUserId } from "@/db/query/store";

import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/theme/mode-toggle";

import { MainNav } from "./main-nav";
import { StoreSwitcher } from "./store-switcher";

export async function NavBar() {
  const stores = await getStoresByCurrentUserId();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}