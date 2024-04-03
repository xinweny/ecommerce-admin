import { useFormContext } from "react-hook-form";
import { Billboard } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/form/form-select";

interface BillboardSelectProps {
  name: string;
  billboards: Billboard[];
}

export function BillboardSelect({
  name,
  billboards,
}: BillboardSelectProps) {
  const { setValue, watch } = useFormContext();

  const billboardId = watch(name);

  return (
    <div className="flex items-end gap-2">
      <FormSelect
        name={name}
        label="Billboard"
        placeholder="Select a billboard"
        values={billboards.map(({ id, label }) => ({
          value: id,
          label,
        }))}
      />
      <Button
        type="button"
        disabled={billboardId === null}
        variant="link"
        onClick={() => { setValue(name, null); }}
      >
        Remove billboard
      </Button>
    </div>
  );
}