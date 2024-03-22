"use client";

import { useEffect } from "react";
import { useIsMounted } from "@/hooks";
import { ImagePlus } from "lucide-react";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "../ui/form";

import { ImagePreview } from "./image-preview";

interface ImageUploadProps {
  name: string;
  label: string;
  limit?: number;
  folder?: string;
  cleanup?: () => void;
}

export function ImageUpload({
  name,
  label,
  limit = 1,
  folder,
  cleanup,
}: ImageUploadProps) {
  const isMounted = useIsMounted();

  const form = useFormContext();

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

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
        const { value } = field;

        const onChange = (url: string) => {
          field.onChange(
            limit === 1
              ? url
              : Array.isArray(value) ? [...value, url] : [url]
          );
        };

        const onRemove = (url: string) => {
          field.onChange(
            limit === 1
              ? value.filter((u: string) => u !== url)
              : null
          );
        };

        const onSuccess = (result: CloudinaryUploadWidgetResults) => {
          const info = result.info as CloudinaryUploadWidgetInfo;
          onChange(info.secure_url);
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div>
                <ImagePreview
                  urls={limit === 1 && value
                    ? [value]
                    : (value || [])}
                  onDelete={onRemove}
                  size={[970, 250]}
                />
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={onSuccess}
                  onError={() =>  { toast.error("Image upload failed."); }}
                  options={{
                    folder: `ecommerce/${folder || ''}`,
                    sources: ["local"],
                    maxFiles: limit,
                    multiple: limit > 1,
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
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