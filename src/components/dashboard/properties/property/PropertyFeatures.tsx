import { FC } from "react";
import PropertyFeatureItem from "./PropertyFeatureItem";

interface ProprtyFeature {
  features: {
    area: string;
    bedrooms?: string;
    bathrooms?: string;
    totalFloors?: string;
    floorNumber?: string;
  };
  renovation: string;
  buildingType?: string;
}

export const PropertyFeatures: FC<ProprtyFeature> = ({
  features,
  renovation,
  buildingType,
}) => {
  const {
    bedrooms,
    bathrooms,
    area,
    floorNumber = "0",
    totalFloors = "0",
  } = features || {};

  const propertyFeatures = [
    { icon: "/svgs/bed.svg", value: `${bedrooms}`, alt: "bed" },
    {
      icon: "/svgs/bathroom.svg",
      value: `${bathrooms}`,
      alt: "bathroom",
    },
    {
      icon: "/svgs/anchor.svg",
      value: `${area} m²`,
      alt: "anchor",
    },
    {
      icon: "/svgs/layer.svg",
      value: `${floorNumber}/${totalFloors}`,
      alt: "layer",
    },
    {
      icon: "/svgs/paintRoller.svg",
      value: `${renovation}`,
      alt: "paint roller",
    },
    {
      icon: "/svgs/brickwall.svg",
      value: `${buildingType}`,
      alt: "brickwall",
    },
  ];

  return (
    <div className="mt-3 flex gap-5">
      {propertyFeatures.map((feature, index) => (
        <PropertyFeatureItem
          key={index}
          icon={feature.icon}
          value={feature.value}
          alt={feature.alt}
        />
      ))}
    </div>
  );
};
