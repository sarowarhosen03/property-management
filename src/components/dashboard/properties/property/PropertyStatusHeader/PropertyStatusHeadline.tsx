import { StatusOptions } from "@/types";
import { FC } from "react";
import { PropertyStatusCheckbox } from "./PropertyStatusCheckbox";

interface PropertyStatusProps {
  title: string;
  options: StatusOptions[];
}

export const PropertyStatusHeadline: FC<PropertyStatusProps> = ({
  title,
  options,
}) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mb-10 mt-4 flex w-full">
        {options.map((option, index) => (
          <PropertyStatusCheckbox
            key={index}
            title={option.label}
            status={option.status}
            className={option.className}
            isHideBorder={option.isHideBorder}
          />
        ))}
      </div>
    </div>
  );
};
