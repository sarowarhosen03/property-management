import { PropertyType } from "@/lib/Propertyschema";
import { FC } from "react";
import { PropertyStats } from "./PropertyStats";

interface FullPropertyType extends PropertyType {
  _id?: string;
  createdAt?: string;
}
interface PropertyProps {
  property: FullPropertyType;
}

export const PropertyDetails: FC<PropertyProps> = ({ property }) => {
  const { _id: id, title, views, likes, shares, createdAt } = property;
  return (
    <div className="mt-6 flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{title?.en}</h2>
        <PropertyStats
          propertyId={id as string}
          views={views}
          likes={likes}
          shares={shares}
          createdAt={createdAt as string}
        />
      </div>
    </div>
  );
};
