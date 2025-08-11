import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCurrency from "./useCurrency";

const filterTypeMappings: Record<string, string[]> = {
  land: [
    "totalFloors",
    "bathrooms",
    "bedrooms",
    "buildingType",
    "houseType",
    "minarea",
    "maxarea",
    "renovation",
    "additionalUtilities",
  ],
  house: ["significance"],
  apartment: [
    "houseType",
    "buildingType",
    "significance",
    "minarea",
    "maxarea",
  ],
};

type Options = {
  filterType: string;
};
export type Actions = {
  action: string;
  filterType?: string;
  toggle?: boolean;
  multiple?: boolean;
};

const useFilter = (options: Options) => {
  const router = useRouter();
  const [currency, , rates] = useCurrency();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  return (actions: Actions) => {
    const filterType = actions.filterType || options.filterType;
    const existingValues = urlSearchParams.get(filterType)?.split(",") ?? [];

    if (
      searchParams.get(filterType)?.includes(actions.action) &&
      actions.toggle
    ) {
      const updatedValues = existingValues.filter(
        (value) => value !== actions.action,
      );

      if (updatedValues.length > 0) {
        urlSearchParams.set(filterType, updatedValues.join(","));
      } else {
        urlSearchParams.delete(filterType);
      }
    } else {
      const updatedValues = actions.multiple
        ? Array.from(
            new Set(
              [...existingValues, actions.action].filter((value) =>
                value?.trim(),
              ),
            ),
          )
        : [actions.action];

      urlSearchParams.set(filterType, updatedValues.join(","));
    }

    if (urlSearchParams.get("location")) {
      urlSearchParams.delete("location");
    }

    const HasPrice = urlSearchParams.toString().includes("price");
    const HasRate = urlSearchParams.get("rate");
    const data = JSON.parse(HasRate as string) || {};
    const isNew = data?.currency !== currency;
    if (HasPrice) {
      if (isNew) {
        urlSearchParams.delete("rate");
        urlSearchParams.set("rate", JSON.stringify({ rates, currency }));
      }
    }

    const currentFilterQueryType = urlSearchParams.get(filterType);
    if (currentFilterQueryType && filterTypeMappings[currentFilterQueryType]) {
      filterTypeMappings[currentFilterQueryType].forEach((param) =>
        urlSearchParams.delete(param),
      );
    }

    const searchParamString = urlSearchParams.toString();

    router.replace(pathname + "?" + searchParamString, { scroll: false });
  };
};

const useActiveFilterClass = (options: Options) => {
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams);

  return (actions: Actions) => {
    const filterType = actions.filterType || options.filterType;
    const filterValues = urlSearchParams
      .get(filterType)
      ?.split(",")
      .map((value) => value.toLocaleLowerCase());

    return filterValues?.includes(actions.action.toLowerCase()) ?? false;
  };
};

export { useActiveFilterClass, useFilter };
