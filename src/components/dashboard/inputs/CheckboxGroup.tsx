import { Checkbox } from "@/components/ui/checkbox";
import { cn, handlerizeString } from "@/lib/utils";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  field: ControllerRenderProps<any, any>;
  direction?: string;
  className?: string;
  labelClasses?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  field,
  direction = "row",
  className,
  labelClasses,
}) => {
  return (
    <div
      className={cn(
        `flex flex-${direction} w-full items-start text-sm font-medium 2xl:text-base`,
        className,
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn("inline-flex items-center space-x-2", labelClasses)}
        >
          <Checkbox
            id={handlerizeString(option.value)}
            value={option.value}
            checked={field.value?.includes(option.value)}
            data-field={field.value}
            onCheckedChange={() => {
              const newValue = field.value?.includes(option.value)
                ? field.value.filter((v: string) => v !== option.value)
                : [...field?.value, option.value];
              field.onChange(newValue);
            }}
            // {...field}
          />

          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
