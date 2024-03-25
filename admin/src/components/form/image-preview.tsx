"use client";

import { useFormContext } from "react-hook-form";
import { Trash } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface ImagePreviewProps {
  name: string;
  isMulti?: boolean;
  listClassName?: string;
  containerClassName?: string;
  imageClassName?: string;
};

export function ImagePreview({
  name,
  isMulti = false,
  listClassName,
  containerClassName,
  imageClassName = "object-cover",
}: ImagePreviewProps) {
  const { watch, setValue } = useFormContext();

  const urls = watch(name);

  const onRemove = (url: string) => {
    setValue(
      name,
      isMulti
        ? urls.filter((u: string) => u !== url)
        : null,
      {
        shouldValidate: false,
      });
  };

  return (
    <div className={listClassName}>
      {urls && (typeof urls === "string" ? [urls] : urls).map((url: string) => (
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
              onClick={() => { onRemove(url); }}
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