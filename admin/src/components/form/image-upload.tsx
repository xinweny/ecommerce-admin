"use client";

import { useIsMounted } from "@/hooks";
import { ImagePlus } from "lucide-react";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { useFieldArray, useFormContext } from "react-hook-form";
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
}

export function ImageUpload({
  name,
  label,
  limit = 1,
  folder,
  publicId,
}: ImageUploadProps) {
  const isMounted = useIsMounted();

  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const { append } = useFieldArray({
    control,
    name,
  });

  if (!isMounted) return null;

  const onSuccess = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryUploadWidgetInfo;
    append(info.secure_url);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
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
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}