import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { Control } from "react-hook-form";

interface InputProps {
  control: Control<any>;
  name: string;
  label?: string;
  defaultValue?: string;
  desription?: string;
  placeholder?: string;
  className?: string;
}

export const InputField: FC<InputProps> = ({
  control,
  name,
  defaultValue,
  desription,
  label,
  placeholder,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Input placeholder={placeholder} {...field} className={className} />
          </FormControl>
          {desription && <FormDescription>{desription}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
