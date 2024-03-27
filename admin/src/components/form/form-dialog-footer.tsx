import { DialogFooter, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { SubmitButton } from "./submit-button";

export function FormDialogFooter() {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <SubmitButton className="ml-auto">
          Create
        </SubmitButton>
      </DialogClose>
    </DialogFooter>
  );
}