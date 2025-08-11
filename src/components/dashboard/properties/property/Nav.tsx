"use client";

import { handleFilterParams } from "@/utils/filterUtils";
import { capitalizeFirstChar } from "@/utils/stringUtils";
import { urlDecode } from "@/utils/urlEncodeDecode";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type FilterType = {
  category: string;
  status: "published" | "draft" | "archive";
};

const CATEGORIES = ["All", "Buy", "Rent", "Daily rent"] as const;
const STATUSES = ["draft", "archive"] as const;

const PropertyNavComp = () => {
  const [terms, setTerms] = useState<FilterType>({
    category: "All",
    status: "published",
  });

  const { replace } = useRouter();
  const path = useSearchParams();

  useEffect(() => {
    const { category = "All", status = "published" } = urlDecode<FilterType>(
      path.toString(),
    );
    setTerms({ category, status });
  }, [path]);

  const handleFilterTerms = (filterValues: FilterType) => {
    setTerms(filterValues);
    const params = handleFilterParams(filterValues);
    replace(`?${params.toString()}`);
  };

  return (
    <ul className="flex gap-4">
      {CATEGORIES.map((category) => (
        <li key={category}>
          <button
            className={`py-1.5 px-3 text-sm text-secondary rounded-full hover:bg-secondary hover:text-white transition-all duration-300 group [&.active]:bg-secondary [&.active]:text-white ${
              terms.category === category && terms.status === "published"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleFilterTerms({
                category,
                status: "published",
              })
            }
          >
            {category}
          </button>
        </li>
      ))}
      {STATUSES.map((status) => (
        <li key={status}>
          <button
            className={`py-1.5 px-3 text-sm text-secondary rounded-full hover:bg-secondary hover:text-white transition-all duration-300 group [&.active]:bg-secondary [&.active]:text-white ${
              terms.status === status ? "active" : ""
            }`}
            onClick={() =>
              handleFilterTerms({
                category: "All",
                status,
              })
            }
          >
            {capitalizeFirstChar(status)}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default function PropertyNav() {
  return (
    <Suspense>
      <PropertyNavComp />
    </Suspense>
  );
}

