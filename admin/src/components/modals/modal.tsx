"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  modal?: boolean;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  modal = true,
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <ModalContent
        title={title}
        description={description}
        disableOutsideInteraction={!modal}
      >
        {children}
      </ModalContent>
    </Dialog>
  );
}

interface ModalContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
  disableOutsideInteraction?: boolean;
}

export function ModalContent({
  title,
  description,
  children,
  disableOutsideInteraction = false,
}: ModalContentProps) {
  return (
    <DialogContent
      onInteractOutside={disableOutsideInteraction
        ? (e) => { e.preventDefault(); }
        : undefined
      }
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div>
        {children}
      </div>
    </DialogContent>
  );
}