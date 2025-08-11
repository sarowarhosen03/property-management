"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { Button } from "@/components/ui/button";
import { useActiveFilterClass, useFilter } from "@/hooks";
import { SearchPage } from "@/lib/db/type";
import { default as DownIncon, default as RankIncon } from "@/svgs/asc.svg";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
function FilterTypesComp({ dict }: { dict: SearchPage }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const handleFilter = useFilter({ filterType: "category" });
  const activeFilterButton = useActiveFilterClass({ filterType: "category" });

  useEffect(() => {
    setTimeout(() => {
      if (params.get("location")) {
        params.set("location", params.get("location"));
      } else {
        params.get("category")
          ? handleFilter({ action: params.get("category") })
          : handleFilter({ action: "buy" });
        params.get("type")
          ? handleFilter({ action: params.get("type"), filterType: "type" })
          : handleFilter({ action: "apartment", filterType: "type" });
      }
    }, 0);

    // First time run this effect. not use dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { replace } = useRouter();
  const { lang }: { lang: langType } = useParams();

  return (
    <>
      <div className="hidden w-full grid-cols-3 flex-col items-center gap-8 md:grid xl:grid-cols-4">
        <div className="relative flex flex-wrap">
          <Button
            onClick={() => handleFilter({ action: "buy" })}
            variant={"secondary"}
            className={`text-base ${activeFilterButton({ action: "buy" }) ? "font-semibold" : "border-transparent bg-transparent text-secondary"}`}
          >
            {dict.buy}
          </Button>

          <Button
            onClick={() => handleFilter({ action: "rent" })}
            variant={"secondary"}
            className={`text-base ${activeFilterButton({ action: "rent" }) ? "font-semibold" : "border-transparent bg-transparent text-secondary"}`}
          >
            {dict.rent}
          </Button>

          <Button
            onClick={() => handleFilter({ action: "daily rent" })}
            variant={"secondary"}
            className={`text-base ${activeFilterButton({ action: "daily rent" }) ? "font-semibold" : "border-transparent bg-transparent text-secondary"}`}
          >
            {dict.DailyRent}
          </Button>
          <div className="absolute -bottom-4 right-0 hidden md:block">
            <button
              onClick={() => replace(`/${lang}/properties`)}
              className="text-xs font-bold underline underline-offset-2"
            >
              {dict.resetAll}
            </button>
          </div>
        </div>
        <Sortbutton dict={dict} />
      </div>
    </>
  );
}
export default function FilterTypes({ dict }: { dict: SearchPage }) {
  return (
    <>
      <Suspense>
        <FilterTypesComp dict={dict} />
      </Suspense>
    </>
  );
}

export function TypeSelectorButton({ dict }: { dict: SearchPage }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const handleFilter = useFilter({ filterType: "category" });
  const activeFilterButton = useActiveFilterClass({ filterType: "category" });

  useEffect(() => {
    setTimeout(() => {
      if (params.get("location")) {
        params.set("location", params.get("location"));
      } else {
        params.get("category")
          ? handleFilter({ action: params.get("category") })
          : handleFilter({ action: "buy" });
        params.get("type")
          ? handleFilter({ action: params.get("type"), filterType: "type" })
          : handleFilter({ action: "apartment", filterType: "type" });
      }
    }, 0);

    // First time run this effect. not use dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full max-w-full justify-between max-lg:overflow-x-auto">
      <Button
        onClick={() => handleFilter({ action: "buy" })}
        size={"md"}
        variant={"secondary"}
        className={`text-lg font-semibold hover:bg-secondary hover:text-light ${activeFilterButton({ action: "buy" }) ? "bg-secondary text-light" : "border-transparent bg-transparent text-secondary"}`}
      >
        {dict.buy}
      </Button>
      <Button
        onClick={() => handleFilter({ action: "rent" })}
        size={"md"}
        variant={"secondary"}
        className={`text-lg font-semibold hover:bg-secondary hover:text-light ${activeFilterButton({ action: "rent" }) ? "bg-secondary text-light" : "border-transparent bg-transparent text-secondary"}`}
      >
        {dict.rent}
      </Button>
      <Button
        onClick={() => handleFilter({ action: "daily rent" })}
        size={"md"}
        variant={"secondary"}
        className={`text-lg font-semibold hover:bg-secondary hover:text-light ${activeFilterButton({ action: "daily rent" }) ? "bg-secondary text-light" : "border-transparent bg-transparent text-secondary"}`}
      >
        {dict.DailyRent}
      </Button>
    </div>
  );
}

export function Sortbutton({ dict }: { dict: SearchPage }) {
  const handleFilter = useFilter({ filterType: "category" });
  const activeFilterButton = useActiveFilterClass({ filterType: "category" });

  return (
    <div className="flex max-w-full justify-between space-x-3 overflow-x-auto text-center">
      <Button
        onClick={() =>
          handleFilter({
            toggle: true,
            filterType: "sortByDate",
            action: "desc",
          })
        }
        size={"sm"}
        variant={"secondary"}
        className={`h-10 px-4 py-2 ${activeFilterButton({ filterType: "sortByDate", action: "desc" }) ? "text-white" : "flex border-[1px] border-solid border-secondary-700 bg-transparent text-secondary"}`}
      >
        <span>{dict.sortByDate} </span>
        <RankIncon
          className={`h-6 w-6 ${activeFilterButton({ filterType: "sortByDate", action: "desc" }) ? "rotate-180" : "rotate-0"} `}
        />
      </Button>

      <Button
        onClick={() =>
          handleFilter({
            toggle: true,
            filterType: "sortByPrice",
            action: "asc",
          })
        }
        size={"sm"}
        variant={"secondary"}
        className={`h-10 px-4 py-2 ${activeFilterButton({ filterType: "sortByPrice", action: "asc" }) ? "text-white" : "flex border-[1px] border-solid border-secondary-700 bg-transparent text-secondary-700"}`}
      >
        <span>{dict.sortByPrice} </span>
        <DownIncon
          className={`h-6 w-6 ${activeFilterButton({ filterType: "sortByPrice", action: "asc" }) ? "rotate-0" : "rotate-180"} `}
        />
      </Button>
    </div>
  );
}
