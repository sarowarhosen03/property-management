"use client";

import { LoadingSpinner } from "@/components/buttons/spinner";
import RangeFilter from "@/components/common/filter-components/range-filter";
import useRange from "@/hooks/useRange";
import { RANGE_STEP } from "@/utils/constant";

export default function PriceSlider({ dict }: { dict: string }) {
  const { priceRanges, loading } = useRange();

  if (loading) {
    return (
      <div className="h-6 w-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <RangeFilter
      filterType={"price"}
      title={dict}
      step={RANGE_STEP}
      max={priceRanges.maxPrice}
      min={priceRanges.minPrice}
    />
  );
}
