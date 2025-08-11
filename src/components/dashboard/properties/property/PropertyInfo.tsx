import { PropertyType } from "@/lib/Propertyschema";
import { containsFeature, convertToPathFormat } from "@/utils/stringUtils";
import { FC } from "react";
import { AgentInfo } from "./AgentInfo";
import { FeatureItemProps } from "./FeatureItems";
import { PropertyDescription } from "./PropertyDescription";
import { PropertyFeatures } from "./PropertyFeatures";
import { PropertyPrice } from "./PropertyPrice";
import { PropertyUtilitiesFeatures } from "./PropertyUtilitiesFeatures";

interface PropertyProps {
  property: PropertyType;
}

// const buildingFeatures: FeatureItemProps[] = [
//   {
//     icon: "/svgs/electric-socket.svg",
//     alt: "Heating type",
//     name: "Heating type",
//     value: "Central",
//   },
//   {
//     icon: "/svgs/electric-socket.svg",
//     alt: "Elevator",
//     name: "Elevator",
//     value: "Available",
//   },
// ];

const utils = [
  "Electricity",
  "Gas",
  "24x7 water supply",
  "Canalization",
  "Irrigation water",
  "Sun side",
  "Parking",
  "Elevator",
  "Security protection",
  "Intercom?",
  "Pool",
];

const additionalUtilities = [
  "Open balcony",
  "Close balcony",
  "Terrasse",
  "Storage room",
  "Garage",
  "Heating system",
  "Hot water",
  "Air conditioner",
  "Satellite dish",
  "Internet",
  "Furniture",
  "Fireplace",
  "Mangal",
];

const apartmentFeatures: FeatureItemProps[] = [
  {
    icon: "/svgs/electric-socket.svg",
    alt: "Area",
    name: "Area",
    value: "84m²",
  },
  {
    icon: "/svgs/electric-socket.svg",
    alt: "Bathroom",
    name: "Bathroom",
    value: "2",
  },
];

export const PropertyInfo: FC<PropertyProps> = ({ property }) => {
  const {
    price,
    location,
    details,
    renovation,
    buildingType,
    agentId,
    description,
  } = property;

  const buildingFeatures: FeatureItemProps[] = details?.utilities.map(
    (feature) => ({
      icon: `/svgs/${convertToPathFormat(feature)}.svg`,
      alt: feature,
      name: feature,
      value: containsFeature(utils, feature) ? "Yes" : "No",
    }),
  );

  return (
    <div className="mt-6 grid grid-cols-2 gap-8">
      <div className="flex flex-col">
        <PropertyPrice price={price} location={location} />

        <PropertyFeatures
          features={details}
          renovation={renovation}
          buildingType={buildingType}
        />

        <PropertyDescription description={description} />

        <div className="mt-8 grid grid-cols-2 gap-24">
          <PropertyUtilitiesFeatures
            title="Building features"
            features={buildingFeatures}
          />

          <PropertyUtilitiesFeatures
            title="Apartment features"
            features={apartmentFeatures}
          />
        </div>
      </div>
      <AgentInfo agentId={agentId?._id} />
    </div>
  );
};
