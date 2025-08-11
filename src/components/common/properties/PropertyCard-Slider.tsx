import { langType } from "@/app/[lang]/(main)/page";

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
import { Property } from "@/types/fetchDataTypes";
import { CurrencyCode, CurrencyRate } from "@/utils/convertCurrency";
import generateTitie from "@/utils/generateTitie";
import getTranslatedProvinceDistrict from "@/utils/translatedProvinceDistric";
import { isEmpty } from "lodash";
import Link from "next/link";
import Price from "../single-product/Price";
import PropertySlider from "./PropertySlider";

const CATEGORY: any = {
  "daily rent": "daily",
  rent: "monthly fee",
};

export async function PropertyCardWithSlider({
  property,
  lang,
  dict,
  rateInfo,
}: {
  property: Property;
  lang: langType;
  dict: PropertyType;
  rateInfo: CurrencyRate;
}) {
  const {
    _id,
    type,
    location: { city, state, address } = {},
    details: { bathrooms, bedrooms, area, totalAreas } = {},
    category,
    price,
    isContractBased

  } = property;
  const { city: tCity, state: tState } = getTranslatedProvinceDistrict({
    from: "en",
    to: lang,
    state: state,
    city: city,
  });

  return (
    <Card className="relative m-2 flex flex-col overflow-hidden">
      <CardImage className="relative">
        <PropertySlider property={property} rounded="lg" height="lg" />
      </CardImage>

      <Link
        className="cursor-pointer"
        prefetch={true}
        href={`/${lang}/properties/${_id}`}
      >
        <CardContent className="text-start font-medium md:text-left 2xl:mt-[-7px]">
          <CardTitle className="text-sm">
            <p>
              {generateTitie({
                city: tCity,
                type,
                lang,
              })}
            </p>
          </CardTitle>

          {state && (
            <CardLocation
              dict={dict}
              className="mt-4"
              location={`${address?.[lang] || ""}, ${tCity}, ${tState}`}
            />
          )}

          <CardStats
            dict={dict}
            className="mt-4 font-bold"
            type="property"
            bedroom={bedrooms}
            bathroom={bathrooms}
            area={area}
            totalareas={totalAreas}
            lang={lang}
          />

          {!isContractBased && <PriceTag
            rateInfo={rateInfo}
            price={price}
            category={category}
            lang={lang}
          />}

        </CardContent>
      </Link>
    </Card>
  );
}

const translatedLabel = {
  en: "per month",
  hy: "ամսական",
  rus: "помесячно",
};
async function PriceTag({
  price,
  rateInfo,
  category,
  lang,
}: {
  category: string;
  rateInfo: CurrencyRate;
  price: { amount: number; currency: CurrencyCode };
  lang: langType;
}) {

  let rate = rateInfo;
  if (isEmpty(rate)) {
    rate = (await getCurrencyRate(price.currency)) as CurrencyRate;
  }

  const label = category == "rent" ? translatedLabel[lang] : category;

  return (
    <CardFooter className="mt-4 p-0 text-xl font-bold capitalize text-[#635577]">
      <Price isCard={true} price={price} rate={rate} />
      {CATEGORY[category] && (
        <span className="ml-1.5 text-sm font-semibold lowercase text-foreground">
          {label}
        </span>
      )}
    </CardFooter>
  );
}
