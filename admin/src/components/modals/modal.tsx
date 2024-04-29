"use client";

import { cn } from "@/lib/utils";

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
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  modal = true,
  className,
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
        className={cn("max-h-[calc(100vh-4rem)] overflow-y-auto", className)}
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
  className?: string;
}

export function ModalContent({
  title,
  description,
  children,
  disableOutsideInteraction = false,
  className,
}: ModalContentProps) {
  return (
    <DialogContent
      onInteractOutside={disableOutsideInteraction
        ? (e) => { e.preventDefault(); }
        : undefined
      }
      className={className}
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