"use client";

import RangeFilter from "@/components/common/filter-components/range-filter";
import { RANGE_MAX_VALUE, RANGE_MIN_VALUE, RANGE_STEP } from "@/utils/constant";

export default function HouseRange({ houseRange }: { houseRange: string }) {
  return (
    <RangeFilter
      filterType={"area"}
      title={houseRange}
      step={RANGE_STEP}
      max={RANGE_MAX_VALUE}
      min={RANGE_MIN_VALUE}
    />
  );
}
