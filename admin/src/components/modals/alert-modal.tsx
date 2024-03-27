"use client";

import { useTransition } from "react";

import { useIsMounted } from "@/hooks";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertModalProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  closeLabel?: string;
  confirmLabel?: string;
  children: React.ReactNode;
}

export function AlertModal({
  title,
  description,
  onConfirm,
  closeLabel,
  confirmLabel,
  children,
}: AlertModalProps) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertModalContent
        title={title}
        description={description}
        onConfirm={onConfirm}
        closeLabel={closeLabel}
        confirmLabel={confirmLabel}
      />
    </AlertDialog>
  );
}

interface AlertModalContentProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  closeLabel?: string;
  confirmLabel?: string;
}

export function AlertModalContent({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  closeLabel = "Cancel",
  confirmLabel = "Confirm",
}: AlertModalContentProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isPending}>
          {closeLabel}
        </AlertDialogCancel>
        <AlertDialogAction
          disabled={isPending}
          onClick={() => { startTransition(onConfirm); }}
        >
          {confirmLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}