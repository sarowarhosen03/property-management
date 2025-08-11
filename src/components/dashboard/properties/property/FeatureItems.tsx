import Image from "next/image";
import { FC } from "react";

export interface FeatureItemProps {
  icon: string;
  alt: string;
  name: string;
  value: string;
}

export const FeatureItem: FC<{ feature: FeatureItemProps }> = ({ feature }) => (
  <div className="flex justify-between">
    <div className="flex gap-2">
      <div className="w-6 h-6">
        <Image src={feature.icon} width={24} height={24} alt={feature.alt} />
      </div>
      <p>{feature.name}</p>
    </div>
    <span className="font-semibold">{feature.value}</span>
  </div>
);
