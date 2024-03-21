"use client";

import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronsUpDown,
  Store as StoreIcon,
  Check,
  PlusCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useStoreModal } from "@/hooks";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface StoreSwitcherProps extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  stores: Store[];
}

export function StoreSwitcher({
  className,
  stores = [],
}: StoreSwitcherProps) {
  const { storeId }= useParams();
  const router = useRouter();

  const storeModal = useStoreModal();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentStore = stores.find(store => store.id === storeId);

  const onStoreSelect = (store: Store) => {
    setIsOpen(false);
    router.push(`/dashboard/${store.id}`);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          <span>{currentStore ? currentStore.name : "Select Store"}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store" />
            <CommandEmpty>No stores found</CommandEmpty>
            <CommandGroup heading="Stores">
              {stores.map(store => (
                <CommandItem
                  key={store.id}
                  onSelect={() => { onStoreSelect(store); }}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-3 w-4" />
                  <span>{store.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.id === store.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                <span>Create Store</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}