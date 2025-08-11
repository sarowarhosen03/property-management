import { langType } from "@/app/[lang]/(main)/page";
import FilterButton from "@/components/common/filter-components/filter-button";
import { roomsOptions } from "@/lib/feildData";

export const roomfilterOptions = ["Studio Apt", "1", "2", "3", "4", "5+"];
export const floofilterOptions = ["1", "2", "3", "4", "5+"];
export default function NumberOfRoom({ lang }: { lang: langType }) {
  return (
    <FilterButton
      filterOptions={roomsOptions[lang]}
      filterType={"bedrooms"}
      title={"Number of Rooms"}
    />
  );
}
