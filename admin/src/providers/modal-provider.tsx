"use client";

import { useEffect, useState } from "react";

import { CreateStoreModal } from "@/components/modals/create-store-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateStoreModal />
    </>
  );
}