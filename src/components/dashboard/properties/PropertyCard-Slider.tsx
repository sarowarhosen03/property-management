import { langType } from "@/app/[lang]/(main)/page";
import PropertySlider from "@/components/common/properties/PropertySlider";
import Price from "@/components/common/single-product/Price";
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardLocation,
  CardStats,
  CardTitle,
} from "@/components/ui/card";
import { Properties as PropertyType } from "@/lib/db/type";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { getDectionary } from "@/lib/getDictionary";
import { PropertyTypeWithId } from "@/lib/Propertyschema";
import { CurrencyRate } from "@/utils/convertCurrency";
import generateTitie from "@/utils/generateTitie";
import getTranslatedProvinceDistrict from "@/utils/translatedProvinceDistric";
import Link from "next/link";
import { FC } from "react";

interface PropertyProps {
  property: PropertyTypeWithId;
  lang: langType;
}

export const PropertyCardWithSlider: FC<PropertyProps> = async ({
  property,
  lang,
}) => {
  const {
    _id,
    type,
    location,
    details: { bathrooms, bedrooms, area, totalAreas } = {},
    category,
    price,
    isContractBased,
  } = property;
  const rate = (await getCurrencyRate(price.currency)) as CurrencyRate;

  const { city, state } = getTranslatedProvinceDistrict({
    from: "en",
    to: lang,
    state: (location as any).state as string,
    city: (location as any).city as string,
  });

  const dictionary: PropertyType = await getDectionary(lang, "properties");

  return (
    <Card className="relative flex flex-col">
      <CardImage className="relative h-[290px]">
        <PropertySlider
          // isSingle={true}
          property={property}
          rounded="lg"
          height="lg"
        />
      </CardImage>

      <CardContent className="p-0 font-medium">
        <CardTitle className="mt-4 text-sm">
          <Link href={`/dashboard/properties/${_id}`}>
            {generateTitie({
              city: city!,
              type,
              lang,
            })}
          </Link>
        </CardTitle>

        <CardLocation
          className="mt-4"
          location={`${location.address?.[lang] || ` ${city}, ${state}`} `}
          dict={dictionary}
        />

        <CardStats
          className="mt-4 font-bold"
          type="property"
          bedroom={bedrooms}
          bathroom={bathrooms}
          area={area}
          totalareas={totalAreas}
          lang={lang}
          dict={dictionary}
        />

        {["rent", "daily rent"].includes(category as string) && (
          <CardFooter className="mt-4 p-0 text-xl font-bold text-[#635577]">
            {!isContractBased && (
              <Price isCard={true} price={price as any} rate={rate} />
            )}

            <span className="ml-1.5 text-sm font-semibold text-foreground">
              {category == "rent" ? dictionary.perMonth : dictionary.perDay}
            </span>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
};
