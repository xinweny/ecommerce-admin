import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteStoreButtonProps {
  storeId: string;
}

export function DeleteStoreButton({
  storeId,
}: DeleteStoreButtonProps) {
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() => {}}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}