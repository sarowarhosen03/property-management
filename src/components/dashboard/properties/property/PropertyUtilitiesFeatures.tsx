import { FC } from "react";
import { FeatureItem, FeatureItemProps } from "./FeatureItems";

interface PropertyFeaturesProps {
  title: string;
  features: FeatureItemProps[];
}

export const PropertyUtilitiesFeatures: FC<PropertyFeaturesProps> = ({
  title,
  features,
}) => (
  <div className="col">
    <h6 className="text-lg 2xl:text-xl font-semibold">{title}</h6>
    <div className="mt-3 flex flex-col gap-5 text-sm 2xl:text-base">
      {features?.map((feature, idx) => (
        <FeatureItem key={idx} feature={feature} />
      ))}
    </div>
  </div>
);
