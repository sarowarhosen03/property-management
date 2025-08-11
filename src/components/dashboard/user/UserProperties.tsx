import { langType } from "@/app/[lang]/(main)/page";
import { PropertyTypeWithId } from "@/lib/Propertyschema";
import { FC } from "react";
import { PropertyCardWithSlider } from "../properties/PropertyCard-Slider";

interface PropertyProps {
  properties: PropertyTypeWithId[];
  lang: langType;
}

const UserProperties: FC<PropertyProps> = ({ properties, lang }) => (
  <div className="mt-10 flex flex-col">
    <h4 className="font-semibold">Active Listing</h4>
    <div className="mt-4 grid w-full grid-cols-3 gap-6">
      {properties?.map((property) => (
        <PropertyCardWithSlider
          key={property._id}
          property={property}
          lang={lang}
        />
      ))}
    </div>
  </div>
);

export default UserProperties;
