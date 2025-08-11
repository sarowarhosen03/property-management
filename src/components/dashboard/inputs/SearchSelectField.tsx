import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SelectSearch, SelectSearchProps } from "./SearchSelect";

export const SelectSearchField: FC<SelectSearchProps & { name: string }> = ({
  name,
  options,
  onChange,
  ...rest
}) => {
  const { control, getValues } = useFormContext();

  const defaultValue = getValues("branchId");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectSearch
          {...field}
          options={options}
          onChange={(value: string) => {
            field.onChange(value);
            if (onChange) onChange(value);
          }}
          value={defaultValue ? defaultValue : field.value}
          {...rest}
        />
      )}
    />
  );
};
