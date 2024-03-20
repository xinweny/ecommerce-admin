"use client";

import { useEffect, useState } from "react";

import { CreateStoreModal } from "@/app/(routes)/(protected)/dashboard/_components/create-store-modal";

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