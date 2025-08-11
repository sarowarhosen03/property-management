"use client";
import { Button } from "@/components/ui/button";

export default function RadioGroup({
  onChange,
  fields,
  value,
}: {
  onChange: any;
  fields: any;
  value: any;
}) {
  return (
    <div className="flex w-full items-center">
      <div className="space-x-3 rounded-full bg-[#F3F2F5]">
        {fields.map((field: any) => (
          <Button
            key={field.value}
            onClick={() => onChange(field.value)}
            size={"sm"}
            variant={"secondary"}
            className={`${field.value === value ? "" : "border-transparent bg-transparent text-secondary-700"}`}
          >
            {field.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
