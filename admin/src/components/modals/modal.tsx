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
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export function Modal({
  title,
  description,
  children,
  trigger,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <ModalContent
        title={title}
        description={description}
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
}

export function ModalContent({
  title,
  description,
  children,
}: ModalContentProps) {
  return (
    <DialogContent>
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