"use client";

import { useEffect } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";


interface ImagePreviewProps {
  urls: string[];
  onDelete: (url: string) => void;
  size: [number, number];
  className?: string;
};

export function ImagePreview({
  urls,
  onDelete,
  size,
  className,
}: ImagePreviewProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      {urls.map((url) => (
        <div
          key={url}
          className={cn(
            "relative rounded-md overflow-hidden",
            `w-[${size[0]}px] h-[${size[1]}px]`,
            className
          )}
        >
          <div className="z-2 absolute top-2 right-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => { onDelete(url); }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image
            fill
            className="object-cover"
            alt="Image"
            src={url}
          />
        </div>
      ))}
    </div>
  );
}