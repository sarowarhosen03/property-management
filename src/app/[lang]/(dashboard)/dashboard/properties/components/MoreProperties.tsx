"use client";

import { langType } from "@/app/[lang]/(main)/page";
import { showToast } from "@/components/common/toaster/toaster";
import { PropertyCard } from "@/components/dashboard/properties/PropertyCard";
import { Button } from "@/components/ui/button";
import { Properties } from "@/lib/db/type";
import { isAdmin } from "@/lib/utils";
import { Property } from "@/types/fetchDataTypes";
import { MAX_BEST_PROPERTIES } from "@/utils/constant";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getProperties } from "../action";

export default function MoreProperties({
  dict,
  seeMore,
  rateList,
  role,
}: {
  rateList: any[];
  role: string | undefined;
  dict: Properties;
  seeMore: string;
  notFound?: string;
}) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { lang }: { lang: langType } = useParams();
  const [totalProperties, setTotalProperties] = useState(MAX_BEST_PROPERTIES);
  const [properties, setProperties] = useState<[] | Property[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const startFetching = async () => {
      const { data: properties = [], total } = await getProperties(
        Object.fromEntries(searchParams),
      );

      startTransition(() => {
        setProperties(properties);
        setTotalProperties(total as number);
        setPage(1);
      });
    };

    startFetching();
  }, [searchParams.toString()]);

  async function handleLoadMore(query: any) {
    try {
      const { data: properties = [], total = totalProperties } =
        await getProperties(Object.fromEntries(query));
      setTotalProperties(total);
      setProperties((prev) => [...prev, ...properties]);
      setPage((prev) => prev + 1);
    } catch (error) {
      showToast({
        type: "error",
        message: "Failed to load more properties",
        title: "Error",
      });
    }
  }

  if (isPending) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-b-8 border-t-8 border-gray-200"></div>
          <div className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-b-8 border-t-8 border-secondary"></div>
        </div>
      </div>
    );
  }

  if (!isPending && properties.length) {
    return (
      <div className="mt-6 grid auto-rows-[272px] grid-cols-2 gap-8">
        {properties?.map((property) => {
          return (
            <PropertyCard
              className="col-span-2 lg:col-span-1"
              dict={dict}
              key={property._id}
              property={property}
              rateList={
                rateList.find(
                  (item) => item.currency === property.price.currency,
                )?.currencyRate
              }
              lang={lang}
              isHideUpdateButton={isAdmin(role as string)}
            />
          );
        })}
        <div
          className={`col-span-2 mt-4 text-center ${
            page * MAX_BEST_PROPERTIES >= totalProperties ? "hidden" : ""
          }`}
        >
          <Button
            onClick={async () => {
              const newSearchPerams = new URLSearchParams(
                searchParams.toString(),
              );
              newSearchPerams.set("page", (page + 1).toString());
              await handleLoadMore(newSearchPerams);
            }}
            variant={"outline"}
            size={"md"}
          >
            {seeMore}
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
