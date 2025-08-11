"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { PropertyCardWithSlider } from "@/components/common/properties/PropertyCard-Slider";
import { Properties as PropertyType } from "@/lib/db/type";
import { getRateForAllCurrency } from "@/lib/getCurrrencyRate";
import { getDectionary } from "@/lib/getDictionary";
import { useEffect, useState } from "react";

import PropertyNotFound from "@/components/common/errors/propertyNotFound";
import PropertyLoader from "@/components/common/loader/PropertyLoader";
import useFavarioute from "@/hooks/useFavarioute";
import { cn } from "@/lib/utils";
import { Property } from "@/types/fetchDataTypes";
import { CurrencyRate } from "@/utils/convertCurrency";
import { getPropertyById } from "@/utils/fetchData";
import { useParams } from "next/navigation";
const FavoritesDict = {
  en: "Favorites",
  hy: "Նախընտրելի",
  rus: "Избранное",
};
export default function Favorites({ dict }: { dict: PropertyType }) {
  const [properties, setFav] = useFavarioute();

  const { lang }: { lang: langType } = useParams();

  useEffect(() => {
    (async () => {
      if (properties.length) {
        const data = await Promise.all(
          properties.map(async (item) => {
            try {
              const property = await getPropertyById(item._id);
              return property.data;
            } catch (error) {
              return null;
            }
          }),
        );

        const newData = data.filter((i) => i !== null);
        setFav([...newData]);
      }
    })();
  }, []);

  return (
    <div className="py-6 lg:py-10">
      <h2 className="mb-4 text-lg font-bold lg:mb-6 lg:text-[32px] lg:leading-tight">
        {FavoritesDict[lang]}
      </h2>
      <div className="-mx-2">
        <Properties dict={dict} properties={properties} lang={lang} />
      </div>
    </div>
  );
}

export function Properties({
  properties,
  className,
  lang = "en",
  dict,
}: {
  dict: PropertyType;
  properties: Property[];
  className?: string;
  lang?: langType;
}) {
  const [config, setConfig] = useState<
    | {}
    | {
        dictionary: PropertyType;
        rateList: any;
      }
  >({});
  const [pending, setPending] = useState(true);
  useEffect(() => {
    (async () => {
      const dictionary: PropertyType = await getDectionary(lang, "properties");
      const rateList = await getRateForAllCurrency(properties);
      setPending(false);
      setConfig({ dictionary, rateList });
    })();
  }, [lang, properties]);

  if (pending) {
    return <PropertyLoader />;
  }

  if (!("dictionary" in config) || !("rateList" in config)) {
    return <PropertyNotFound dict={dict} />;
  }

  if (!pending && properties.length == 0) {
    return <PropertyNotFound dict={dict} />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 tab:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8",
        className,
      )}
    >
      {properties?.map((property) => (
        <PropertyCardWithSlider
          property={property}
          key={property._id}
          lang={lang}
          dict={config.dictionary}
          rateInfo={
            config?.rateList.find(
              (item: { currency: string; CurrencyRate: CurrencyRate }) =>
                item.currency === property.price.currency,
            )?.currencyRate
          }
        />
      ))}
    </div>
  );
}
