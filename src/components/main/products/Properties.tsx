import { langType } from "@/app/[lang]/(main)/page";
import PropertyNotFound from "@/components/common/errors/propertyNotFound";
import { PropertyCardWithSlider } from "@/components/common/properties/PropertyCard-Slider";
import { Properties as PropertyType } from "@/lib/db/type";
import { getRateForAllCurrency } from "@/lib/getCurrrencyRate";
import { getDectionary } from "@/lib/getDictionary";

import { cn } from "@/lib/utils";
import { Property } from "@/types/fetchDataTypes";
import { CurrencyCode } from "@/utils/convertCurrency";

const getCurrencyRate = (rateList: any[], currencyCode: CurrencyCode) => {
  return rateList.find((item) => item.currency === currencyCode);
};

export async function Properties({
  properties,
  className,
  lang = "en",
}: {
  properties: Property[];
  className?: string;
  lang?: langType;
}) {
  const dictionary: PropertyType = await getDectionary(lang, "properties");
  const rateList = await getRateForAllCurrency(properties);

  if (properties?.length === 0) {
    return <PropertyNotFound dict={dictionary} />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 tab:grid-cols-2 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {properties?.map((property) => (
        <PropertyCardWithSlider
          property={property}
          key={property._id}
          lang={lang}
          dict={dictionary}
          rateInfo={
            getCurrencyRate(rateList, property.price.currency)?.currencyRate
          }
        />
      ))}
    </div>
  );
}

export default Properties;
