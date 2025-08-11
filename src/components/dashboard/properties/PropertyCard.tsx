"use client";
import { langType } from "@/app/[lang]/(main)/page";
import PropertySlider from "@/components/common/properties/PropertySlider";
import Price from "@/components/common/single-product/Price";
import { DuplicatePropertyBadge } from "@/components/duplicate-property-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardLocation,
  CardStats,
  CardTitle,
} from "@/components/ui/card";
import { Properties } from "@/lib/db/type";
import { Property } from "@/types/fetchDataTypes";
import { LAST_UPDATED_TEXT, PUBLISHED_TEXT } from "@/utils/constant";
import { CurrencyRate } from "@/utils/convertCurrency";
import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import generateTitie from "@/utils/generateTitie";
import getTranslatedProvinceDistrict from "@/utils/translatedProvinceDistric";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import PropertyUpdateButton from "./PropertyUpdateButton";

interface PropertyProps {
  property: Property;
  dict: Properties;
  rateList?: CurrencyRate;
  className?: string;
  lang: langType;
  isHideUpdateButton: boolean;
}

export const PropertyCard: FC<PropertyProps> = ({
  property,
  dict,
  rateList,
  className = "",
  isHideUpdateButton,
  lang,
}) => {
  const {
    _id: id,
    views,
    likes,
    shares,
    type,
    location: { state, city, address } = {},
    details: { bathrooms, bedrooms, area, totalAreas } = {},
    price,
    category,
    createdAt,
    lastUpdatedTime,
    isDuplicate,
    isContractBased,
  } = property || {};
  let rate = rateList;

  const { city: tCity, state: tState } = getTranslatedProvinceDistrict({
    from: "en",
    to: lang,
    state: state,
    city: city,
  });

  const router = useRouter();
  const searchParams = useSearchParams().toString();

  function goToProperty(id: string) {
    const currentUrl = `/dashboard/properties?${searchParams}`;
    sessionStorage.setItem("propertyBackUrl", currentUrl);
    router.push(`/dashboard/properties/${id}`);
  }

  return (
    <Card className={`relative grid grid-cols-2 gap-2 ${className}`}>
      <CardImage className="relative">
        <PropertySlider
          property={property}
          rounded="sm"
          height="sm"
          linkPrefix="/dashboard"
          isHideHeartIcon
        />
      </CardImage>

      <CardContent className="p-0 font-medium lg:p-0">
        <div className="flex justify-between gap-2 text-xs 2xl:text-sm">
          <span>
            {PUBLISHED_TEXT[lang]} {formatDateFromISODate(createdAt as string)}
          </span>
          {isDuplicate && <DuplicatePropertyBadge />}
        </div>

        <CardStats
          dict={dict}
          className="mt-2 flex gap-4 text-base"
          type="social"
          views={views}
          shares={likes}
          likes={shares}
          lang={lang}
        />
        <CardTitle className="mb-2 mt-4 text-sm">
          {generateTitie({
            city: tCity!,
            type,
            lang,
          })}
        </CardTitle>

        <CardLocation
          dict={dict}
          className="mt-2"
          location={`${typeof address === "object" ? address?.[lang] : ""} , ${tCity}, ${tState}`}
        />
        <CardStats
          dict={dict}
          className="mt-2 font-bold"
          type="property"
          bedroom={bedrooms}
          bathroom={bathrooms}
          area={area}
          totalareas={totalAreas}
          lang={lang}
        />
        {!isContractBased && (
          <CardFooter className="mt-2 p-0 font-bold text-secondary">
            <Price isCard={true} price={price} rate={rate!} />

            {["rent", "daily rent"].includes(category as string) && (
              <span className="ml-1.5 text-sm font-semibold text-foreground">
                {category === "rent" ? dict.perMonth : dict.perDay}
              </span>
            )}
          </CardFooter>
        )}

        {isHideUpdateButton && (
          <div className="relative z-2">
            <PropertyUpdateButton propertyId={id} lang={lang} />
            <span className="mt-2 block text-[10px]">
              {LAST_UPDATED_TEXT[lang]}{" "}
              <span className="">
                {formatDateFromISODate(
                  lastUpdatedTime || (createdAt as string),
                )}
              </span>
            </span>
          </div>
        )}
      </CardContent>
      <button
        className="absolute inset-0 z-1"
        onClick={() => goToProperty(id)}
      ></button>
    </Card>
  );
};
