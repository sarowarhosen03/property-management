"use client";

import { AdminProperties } from "@/lib/db/type";
import { handleFilterParams } from "@/utils/filterUtils";
import { capitalizeFirstChar } from "@/utils/stringUtils";
import { urlDecode } from "@/utils/urlEncodeDecode";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type FilterType = {
  category: string;
  status: "published" | "draft" | "archive";
};

const PropertyNavcomp = ({ dict }: { dict: AdminProperties }) => {
  const [terms, setTerms] = useState<FilterType>({
    category: "all",
    status: "published",
  });
  const CATEGORIES = [
    {
      name: "All",
      Label: dict.all,
    },
    {
      name: "Buy",
      Label: dict.buy,
    },
    {
      name: "Rent",
      Label: dict.rent,
    },
    {
      name: "Daily rent",
      Label: dict.dailyRent,
    },
  ] as const;
  const STATUSES = [
    {
      name: "draft",
      label: dict.draft,
    },
    {
      name: "archive",
      label: dict.archive,
    },
  ] as const;

  const { replace } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const { category = "all", status = "published" } = urlDecode<FilterType>(
      searchParams.toString(),
    );
    setTerms({ category, status });
  }, [searchParams]);

  const handleFilterTerms = (filterValues: Partial<FilterType>) => {
    setTerms((prev) => ({ ...prev, ...filterValues }));
    const params = handleFilterParams(filterValues, searchParams);
    replace(`?${params.toString()}`);
  };

  return (
    <ul className="flex gap-4">
      {CATEGORIES.map((category) => (
        <li key={category.name}>
          <button
            className={`group rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white [&.active]:bg-secondary [&.active]:text-white ${
              terms.category === category.name.toLocaleLowerCase() &&
              terms.status === "published"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleFilterTerms({
                category: category.name.toLowerCase(),
                status: "published",
              })
            }
          >
            {capitalizeFirstChar(category.Label)}
          </button>
        </li>
      ))}
      {STATUSES.map((status) => (
        <li key={status.name}>
          <button
            className={`group rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white [&.active]:bg-secondary [&.active]:text-white ${
              terms.status === status.name ? "active" : ""
            }`}
            onClick={() =>
              handleFilterTerms({
                category: "all",
                status: status.name,
              })
            }
          >
            {capitalizeFirstChar(status.label)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default function PropertyNav({ dict }: { dict: AdminProperties }) {
  return (
    <Suspense>
      <PropertyNavcomp dict={dict} />
    </Suspense>
  );
}
