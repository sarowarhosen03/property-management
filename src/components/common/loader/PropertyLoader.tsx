"use client";
import { cn } from "@/lib/utils";
import PropertyCardWithSkeleton from "./PropertyCardWithSkeleton";

export default function PropertyLoader({ className = "", item = 8 }) {
  const items = Array.from({ length: item }, (_, i) => i + 1);
  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3",
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
