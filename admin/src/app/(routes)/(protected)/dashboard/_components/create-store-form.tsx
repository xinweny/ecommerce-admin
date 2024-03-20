import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createStoreSchema } from "@/schemas/store";

import { Form } from "@/components/ui/form";

export function CreateStoreForm() {
  const form = useForm<z.infer<typeof createStoreSchema>>({
    resolver: zodResolver(createStoreSchema)
  });

  const onSubmit = async (values: z.infer<typeof createStoreSchema>) => {

  };

  return (
    <div>
      <div className="space-y-4 py-2 pb-4">
        <Form>

        </Form>
      </div>
    </div>
  );
}