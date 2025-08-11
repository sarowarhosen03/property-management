"use client";
import { langType } from "@/app/[lang]/(main)/page";

import { Button } from "@/components/ui/button";
import { roomsOptions } from "@/lib/feildData";
import { Dispatch, SetStateAction } from "react";

export default function RoomSelector({
  selectedButton,
  setSelectedButton,
  lang,
}: {
  count?: number;
  name?: string;
  lang: langType;
  selectedButton: number[];
  setSelectedButton: Dispatch<SetStateAction<number[]>>;
}) {
  const handleClick = (index: number) => {
    if (selectedButton.includes(index)) {
      setSelectedButton(
        selectedButton.filter((btnIndex) => btnIndex !== index),
      );
    } else {
      setSelectedButton([...selectedButton, index]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 lg:gap-2">
      {roomsOptions[lang].map((label, index) => (
        <Button
          key={index}
          variant={"outline"}
          size={"sm"}
          className={`aspect-square h-9 text-sm lg:text-base ${
            selectedButton.includes(index) ? "bg-secondary text-light" : ""
          }`}
          onClick={() => handleClick(index)}
        >
          {label.label}
        </Button>
      ))}
    </div>
  );
}
