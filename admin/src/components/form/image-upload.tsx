"use client";

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

interface ImageUploadProps {
  name: string;
  label: string;
  limit?: number;
  folder?: string;
  publicId?: string;
  preview?: React.ReactNode;
  withRemove?: boolean;
}

export function ImageUpload({
  name,
  label,
  limit = 1,
  folder,
  publicId,
  preview,
  withRemove = false,
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
        const { value } = field;

        const onChange = (url: string) => {
          field.onChange(
            limit === 1
              ? url
              : Array.isArray(value) ? [...value, url] : [url]
          );
        };

        const onRemove = () => {
          field.onChange(null);
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
                {preview}
                <div className="flex gap-2">
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    signatureEndpoint="/api/cloudinary/sign"
                    onSuccess={onSuccess}
                    onError={() =>  { toast.error("Image upload failed."); }}
                    options={{
                      publicId,
                      folder: `ecommerce/${folder || ''}`,
                      sources: ["local"],
                      maxFiles: limit,
                      multiple: limit > 1,
                      clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
                      resourceType: "image",
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
                  {(withRemove && limit === 1 )&& (
                    <Button
                      onClick={onRemove}
                      type="button"
                      variant="link"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}