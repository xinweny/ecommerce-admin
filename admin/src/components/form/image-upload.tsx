"use client";

import { useIsMounted } from "@/hooks";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "../ui/form";

interface ImageUploadProps {
  name: string;
  label: string;
  limit?: number;
  folder?: string;
}

export function ImageUpload({
  name,
  label,
  limit = 1,
  folder,
}: ImageUploadProps) {
  const isMounted = useIsMounted();

  const form = useFormContext();

  const {
    control,
    formState: { isSubmitting },
  } = form;

  if (!isMounted) return null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const onChange = (url: string) => { field.onChange(url); };

        const value = field.value ? [field.value] : [];

        const onRemove = (url?: string) => {
          field.onChange(url
            ? value.filter(u => u !== url)
            : null);
        };

        const onSuccess = (result: any) => { onChange(result.info.secure_url); };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div>
                <div className="mb-4 flex items-center gap-4">
                  {value.map((url) => (
                    <div
                      key={url}
                      className="relative w-auto h-[200px] rounded-md overflow-hidden"
                    >
                      <div className="z-2 absolute top-2 right-2">
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
                        className="object-cover"
                        alt="Image"
                        src="url"
                      />
                    </div>
                  ))}
                </div>
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary"
                  onSuccess={onSuccess}
                  onError={() =>  { toast.error("Image upload failed."); }}
                  options={{
                    folder: `ecommerce/${folder || ''}`,
                    sources: ["local"],
                    maxFiles: limit,
                    multiple: limit > 1,
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
                    singleUploadAutoClose: false,
                  }}
                >
                  {({ open }) => (
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={isSubmitting}
                      onClick={() => { open(); }}
                    >
                      <ImagePlus className="h-4 w-4 mr-2" />
                      <span>Upload an image</span>
                    </Button>
                  )}
                </CldUploadWidget>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}