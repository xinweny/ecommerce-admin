import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";

import { ProductSchema } from "@/schemas/product";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";

export function AddProductItemForm() {
  const name = "productItems";

  const { control } = useFormContext<ProductSchema>();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-4"> 
        <h2 className="font-bold text-2xl">Product Items</h2>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            append({
              name: "",
              sku: "",
              stock: 0,
              price: 0,
              imageUrls: [],
            });
          }}
        >
          <Plus className="mr-2" />
          <span>Add Item</span>
        </Button>
      </div>
      <ul className="flex gap-4 flex-wrap">
      {fields.map((field, index) => (
        <li key={field.id} className="border p-6 rounded space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl">{`Item ${index + 1}`}</h3>
            <button type="button" onClick={() => { remove(index); }}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <FormInput
            name={`${name}.${index}.name`}
            label="Name"
          />
          <FormInput
            name={`${name}.${index}.sku`}
            label="SKU"
          />
          <FormInput
            name={`${name}.${index}.stock`}
            label="Quantity"
            type="number"
          />
          <FormInput
            name={`${name}.${index}.price`}
            label="Price"
            type="number"
          />
        </li>
      ))}
      </ul>
    </section>
  );
}