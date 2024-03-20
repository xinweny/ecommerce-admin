import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createStoreSchema } from "@/schemas/store";

import { useStoreModal } from "@/hooks";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";

export function CreateStoreForm() {
  const { onClose } = useStoreModal();

  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema)
  });

  const onSubmit = async (values: z.infer<typeof createStoreSchema>) => {

  };

  return (
    <div>
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Piano"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <SubmitButton>Create</SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}