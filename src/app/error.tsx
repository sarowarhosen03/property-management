"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Error boundaries must be Client Components

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { back } = useRouter();
  useEffect(() => {
    back();
  }, [back]);
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center space-y-5">
      <h2 className="text-lg font-bold text-red-500">Something went wrong!</h2>
      <Button variant="primary" size="lg" onClick={() => reset()}>
        <RotateCcw />
      </Button>
    </div>
  );
}
