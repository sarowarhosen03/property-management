import Image from "next/image";
import { FC } from "react";

interface PropertyFeatureItemProps {
  icon: string;
  value: string;
  alt: string;
}

const PropertyFeatureItem: FC<PropertyFeatureItemProps> = ({
  icon,
  value,
  alt,
}) => (
  <div className="flex items-center justify-center gap-2">
    <Image className="h-6 w-6" src={icon} height={24} width={24} alt={alt} />
    <span className="font-bold">{value}</span>
  </div>
);

export default PropertyFeatureItem;
