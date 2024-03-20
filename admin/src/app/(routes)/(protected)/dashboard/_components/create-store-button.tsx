"use client";

import { Button } from "@/components/ui/button";

import { useStoreModal } from "@/hooks";

export function CreateStoreButton() {
  const { onOpen } = useStoreModal();

  return (
    <Button onClick={onOpen}>
      Create Store
    </Button>
  );
}