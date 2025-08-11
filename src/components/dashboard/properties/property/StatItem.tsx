import Image from "next/image";
import { FC } from "react";

interface StatItemProps {
  icon: string;
  value: string | number;
  alt: string;
}

export const StatItem: FC<StatItemProps> = ({ icon, value, alt }) => (
  <div className="flex items-center">
    <div className="relative w-4 2xl:w-6 h-4 2xl:h6 mr-1 2xl:mr-2">
      <Image
        src={icon}
        width={24}
        height={24}
        alt={alt}
        className="w-4 2xl:w-6 h-4 2xl:h6"
      />
    </div>
    <span>{value}</span>
  </div>
);
