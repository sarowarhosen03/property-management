"use client";

import RangeFilter from "@/components/common/filter-components/range-filter";
import { RANGE_MAX_VALUE, RANGE_MIN_VALUE, RANGE_STEP } from "@/utils/constant";

export default function GardenRange({ gardenRange }: { gardenRange: string }) {
  return (
    <RangeFilter
      filterType={"gardenRange"}
      title={gardenRange}
      step={RANGE_STEP}
      max={RANGE_MAX_VALUE}
      min={RANGE_MIN_VALUE}
    />
  );
}
