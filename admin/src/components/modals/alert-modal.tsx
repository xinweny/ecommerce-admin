"use client";

import { useTransition } from "react";

import { useIsMounted } from "@/hooks";

import { Button } from "../ui/button";

import { Modal } from "./modal";

interface AlertModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  closeLabel?: string;
  confirmLabel?: string;
}

export function AlertModal({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  isOpen,
  onClose,
  onConfirm,
  closeLabel = "Cancel",
  confirmLabel = "Confirm",
}: AlertModalProps) {
  const isMounted = useIsMounted();

  const [isPending, startTransition] = useTransition();

  if (!isMounted) return null;

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 items-center justify-end w-full">
        <Button
          disabled={isPending}
          variant="outline"
          onClick={onClose}
        >
          {closeLabel}
        </Button>
        <Button
          disabled={isPending}
          variant="destructive"
          onClick={() => { startTransition(onConfirm); }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}