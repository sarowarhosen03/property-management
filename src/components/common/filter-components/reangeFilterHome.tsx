"use client";

import { Slider } from "@/components/ui/slider";
import { RANGE_MAX_VALUE, RANGE_MIN } from "@/utils/constant";
import { ChangeEvent } from "react";

export default function RangeFilterHome({
  title,
  step = 10,
  max = RANGE_MAX_VALUE,
  min = RANGE_MIN,
  minValue,
  maxValue,
  setMaxValue,
  setMinValue,
}: {
  title: string;
  min?: number;
  max?: number;
  step?: number;
  maxValue: number;
  setMaxValue: Function;
  minValue: number;
  setMinValue: Function;
}) {
  const handleMinValueChange = (value: number) => {
    setMinValue(value);
  };

  const handleMaxValueChange = (value: number) => {
    setMaxValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === "max") {
      setMaxValue(e.target.value);
    } else {
      setMinValue(e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="flex items-center justify-start gap-10 lg:gap-24">
        <input
          className="h-7 w-[125px] justify-start rounded-3xl border border-secondary-200 bg-light px-2 focus:border-secondary focus:outline-none"
          value={minValue}
          onChange={(e) => handleChange(e, "min")}
        />
        <input
          className="h-7 w-[125px] justify-start rounded-3xl border border-secondary-200 bg-light px-2 focus:border-secondary focus:outline-none"
          value={maxValue}
          onChange={(e) => handleChange(e, "max")}
        />
      </div>
      <div className="mt-6">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[minValue, maxValue]}
          onValueChange={(values) => {
            handleMinValueChange(values[0]);
            handleMaxValueChange(values[1]);
          }}
          className="w-[84%] flex-1"
        >
          <div className="bg-gray-300 dark:bg-gray-700">
            <div className="bg-primary" />
          </div>
          <div className="bg-white shadow-md dark:bg-gray-950" />
          <div className="bg-primary" />
          <div className="bg-primary" />
        </Slider>
      </div>
    </div>
  );
}
