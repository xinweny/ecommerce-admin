"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface ImagePreviewProps {
  name: string;
  listClassName?: string;
  containerClassName?: string;
  imageClassName?: string;
};

export function ImagePreview({
  name,
  listClassName,
  containerClassName,
  imageClassName = "object-cover",
}: ImagePreviewProps) {
  const { control, watch } = useFormContext();

  const { remove } = useFieldArray({
    control,
    name,
  });

  const urls: string[] | string | null = watch(name);

  if (!urls || urls.length === 0) return;

  return (
    <div className={listClassName}>
      {(typeof urls === "string" ? [urls] : urls).map((url, index) => (
        <div
          key={url}
          className={cn(
            "relative rounded-md overflow-hidden",
            containerClassName
          )}
        >
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => { remove(index); }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image
            fill
            className={imageClassName}
            alt="Image"
            src={url}
          />
        </div>
      ))}
    </div>
  );
}