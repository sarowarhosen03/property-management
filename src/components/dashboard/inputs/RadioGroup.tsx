import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React, { ReactElement } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
  icon?: ReactElement;
}

interface RadioGroupProps {
  options: RadioOption[];
  field: ControllerRenderProps<any, any>;
  variant?: "rounded" | "rectangle" | "radio";
  className?: string;
  direction?: "row" | "col";
}

const RadioVariant = cva(
  "text-sm 2xl:text-base font-medium h-8 rounded-full cursor-pointer relative  z-[1] inline-flex items-center",
  {
    variants: {
      variant: {
        rounded:
          "inline-flex items-center justify-center p-1.5 px-3 min-w-8 min-h-8",

        rectangle: "rectangle px-3",
        radio: "radio",
      },
      defaultVariants: {
        variant: "rouned",
      },
    },
  },
);

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  field,
  variant,
  className,
}) => {
  return (
    <div className={cn("inline-flex h-8 gap-2 rounded-full", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn("group", RadioVariant({ variant }))}
        >
          <input
            type="radio"
            {...field}
            value={String(option.value)}
            checked={String(field.value) === String(option.value)}
            className="peer absolute h-0 w-0"
          />
          <div className="decoration-100 peer mr-2 hidden h-6 w-6 shrink-0 rounded-full border border-gray-200 ring-offset-background transition-all hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:border-gray-200 disabled:bg-gray-200 disabled:opacity-50 group-hover:border-secondary group-[.radio]:block peer-checked:border-[5px] peer-checked:border-secondary peer-disabled:cursor-not-allowed peer-disabled:!border-gray-200 peer-disabled:bg-gray-200"></div>
          <span className="flex items-center gap-2 whitespace-nowrap transition-all duration-300 group-[.radio]:!text-secondary peer-checked:text-white">
            {option?.icon && (
              <span className="inline-block">{option.icon}</span>
            )}{" "}
            {option.label}
          </span>
          <div className="absolute bottom-0 left-0 right-0 top-0 -z-[1] rounded-full border border-secondary-600 transition-all duration-300 group-[.radio]:hidden group-[.rectangle]:border-0 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:opacity-100"></div>
        </label>
      ))}
    </div>
  );
};
