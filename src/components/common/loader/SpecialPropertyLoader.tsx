"use client";
import { cn } from "@/lib/utils";
import PropertyCardWithSkeleton from "./PropertyCardWithSkeleton";

export default function SpecialPropertyLoader({ className = "", item = 8 }) {
  const items = Array.from({ length: item }, (_, i) => i + 1);
  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 tab:grid-cols-2 md:grid-cols-2 lg:grid-cols-4",
          className,
        )}
      >
        {items.map((v) => (
          <PropertyCardWithSkeleton key={v} />
        ))}
      </div>
    </>
  );
}
