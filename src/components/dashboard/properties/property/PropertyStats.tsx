import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import { formatNumberShort } from "@/utils/formatNumberShort";
import { FC } from "react";
import { StatItem } from "./StatItem";

interface PropertyStats {
  propertyId: string;
  views: number;
  likes: number;
  shares: number;
  createdAt: string;
}

export const PropertyStats: FC<PropertyStats> = ({
  likes,
  shares,
  views,
  propertyId,
  createdAt,
}) => (
  <div className="flex gap-4 text-sm 2xl:text-base items-center">
    <div>
      <span className="text-[#625676]">Date</span>{" "}
      {formatDateFromISODate(createdAt)}
    </div>
    <div>
      <span className="text-[#625676]">ID</span> [{propertyId}]
    </div>
    <div className="flex gap-4">
      <StatItem
        icon="/svgs/eye.svg"
        value={formatNumberShort(views)}
        alt="views"
      />
      <StatItem
        icon="/svgs/share.svg"
        value={formatNumberShort(shares)}
        alt="shares"
      />
      <StatItem
        icon="/svgs/favorite.svg"
        value={formatNumberShort(likes)}
        alt="favorites"
      />
    </div>
  </div>
);
