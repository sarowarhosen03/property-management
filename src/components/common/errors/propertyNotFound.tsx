"use client";
import { Button } from "@/components/ui/button";
import { Properties as PropertyType, SingeProperty } from "@/lib/db/type";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropertyNotFound({
  dict,
}: {
  dict: PropertyType | SingeProperty;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();
    const randomTime = Math.floor(Math.random() * (2000 - 100 + 1)) + 100;
    setTimeout(() => {
      setLoading(false);
    }, randomTime);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-gray-100 p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-secondary lg:text-9xl">
          404
        </h1>
        <h2 className="mt-6 text-3xl font-semibold text-gray-900">
          {dict.propertyNotFound}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {
            dict[
              "We're sorry, but the property you're looking for doesn't exist or has  been removed."
            ]
          }
        </p>
        <div className="mt-5">
          <Button
            onClick={handleRefresh}
            variant={"outline"}
            disabled={loading}
          >
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Loader className="mr-2 h-4 w-4" />
            )}
            {dict.Refresh}
          </Button>
        </div>
      </div>
    </div>
  );
}
