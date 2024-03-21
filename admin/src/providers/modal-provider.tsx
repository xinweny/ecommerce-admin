"use client";

import { useIsMounted } from "@/hooks";

import { CreateStoreModal } from "@/app/(routes)/(protected)/dashboard/_components/create-store-modal";

export function ModalProvider() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <>
      <CreateStoreModal />
    </>
  );
}