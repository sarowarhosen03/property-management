"use client";

import { Slider } from "@/components/ui/slider";
import { useFilter } from "@/hooks";
import debounce from "lodash/debounce";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function RangeFilterC({
  title,
  min,
  max,
  step,
  filterType,
}: {
  title: string;
  min: number;
  max: number;
  step: number;
  filterType: string;
}) {
  const searchParams = useSearchParams();
  const [rang, setRange] = useState({ min, max });
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const handleFilter = useFilter({ filterType: `max${filterType}` });

  useEffect(() => {
    setRange({ min, max });
  }, [min, max]);

  useEffect(() => {
    const minValue = parseInt(searchParams.get(`min${filterType}`) as string);
    const maxValue = parseInt(searchParams.get(`max${filterType}`) as string);

    if (maxValue) setMaxValue(maxValue);
    if (minValue) setMinValue(minValue);
  }, [searchParams, filterType]);

  const debouncedHandleMinValueChange = useRef(
    debounce((value: number) => {
      handleFilter({ action: value as any, filterType: `min${filterType}` });
    }, 700),
  ).current;

  const debouncedHandleMaxValueChange = useRef(
    debounce((value: number) => {
      handleFilter({ action: value as any, filterType: `max${filterType}` });
    }, 700),
  ).current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = parseInt(e.target.value);
    if (type === "max") {
      setMaxValue(value);
      debouncedHandleMaxValueChange(value);
    } else {
      setMinValue(value);
      debouncedHandleMinValueChange(value);
    }
  };

  const handleSliderChange = (values: [number, number]) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);

    debouncedHandleMinValueChange(values[0]);
    debouncedHandleMaxValueChange(values[1]);
  };

  return (
    <div className="flex flex-col text-left">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 flex items-center justify-between gap-4">
        <input
          type="number"
          className="h-7 w-[100px] rounded-3xl border border-secondary-200 bg-light px-2 focus:border-secondary focus:outline-none xl:w-[125px]"
          value={minValue}
          onChange={(e) => handleChange(e, "min")}
        />
        <input
          type="number"
          className="h-7 w-[100px] rounded-3xl border border-secondary-200 bg-light px-2 focus:border-secondary focus:outline-none xl:w-[125px]"
          value={maxValue}
          onChange={(e) => handleChange(e, "max")}
        />
      </div>
      <div className="mt-4">
        <Slider
          min={rang.min}
          max={rang.max}
          step={step}
          value={[minValue, maxValue]}
          onValueChange={handleSliderChange}
          className="my-2 flex-1"
        />
      </div>
    </div>
  );
}
