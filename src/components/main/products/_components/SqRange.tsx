"use client";

import RangeFilter from "@/components/common/filter-components/range-filter";
import { RANGE_MAX_VALUE, RANGE_MIN_VALUE, RANGE_STEP } from "@/utils/constant";

export default function SqRange({ sqRange }: { sqRange: string }) {
  return (
    <RangeFilter
      filterType={"totalAreas"}
      title={sqRange}
      step={RANGE_STEP}
      max={RANGE_MAX_VALUE}
      min={RANGE_MIN_VALUE}
    />
  );
}
