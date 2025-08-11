import { langType } from "@/app/[lang]/(main)/page";
import FilterButton from "@/components/common/filter-components/filter-button";
import { floorOptions } from "@/components/dashboard/forms/_components/HouseForm";
import { SearchPage } from "@/lib/db/type";
import { roomsOptions } from "@/lib/feildData";
import PriceSlider from "../allProducts/PriceSlider";

const shouldShowRooms = (type: string) => type !== "commercial";
const shouldShowFloors = (type: string) =>
  type !== "apartment" && type !== "commercial";
const shouldShowFilter = (type: string) =>
  ["apartment", "house", "commercial"].includes(type);

interface PriceFilterProps {
  filterType: string;
  dict: SearchPage;
  lang: langType;
}

export default function FilterSection({
  filterType,
  dict,
  lang,
}: PriceFilterProps) {
  return (
    <div className="mt-8">
      <PriceSlider dict={dict.PriceRange} />

      {shouldShowFilter(filterType) && (
        <>
          {shouldShowRooms(filterType) && (
            <FilterButton
              filterOptions={roomsOptions[lang]}
              filterType="bedrooms"
              title={dict.numberOfRooms}
              byIndex
            />
          )}
          {shouldShowFloors(filterType) && (
            <FilterButton
              filterOptions={floorOptions[lang]}
              filterType="totalFloors"
              title={dict.numberOfFloor}
            />
          )}
        </>
      )}
    </div>
  );
}
