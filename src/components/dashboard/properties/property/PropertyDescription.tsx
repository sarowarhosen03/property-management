import { FC } from "react";

interface PropertyDescriptionProps {
  description: {
    en: string;
    hy?: string;
    rus?: string;
  };
}

export const PropertyDescription: FC<PropertyDescriptionProps> = ({
  description,
}) => (
  <div className="mt-8">
    <h6 className="text-lg font-semibold 2xl:text-xl">Description</h6>
    <div className="mt-2 text-sm font-medium 2xl:text-base">
      <p>{description?.en}</p>
    </div>
  </div>
);
