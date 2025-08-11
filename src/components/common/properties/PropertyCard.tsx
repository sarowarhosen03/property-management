import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardLocation,
  CardStats,
  CardTitle,
} from "@/components/ui/card";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { PropertyTypeWithId } from "@/lib/Propertyschema";
import { CurrencyRate } from "@/utils/convertCurrency";
import { formatDateFromISODate } from "@/utils/formatDateFromISODate";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Price from "../single-product/Price";

interface PropertyCardProps extends PropertyTypeWithId {
  createdAt: string;
}

interface PropertyProps {
  property: PropertyCardProps;
}

export const PropertyCard: FC<PropertyProps> = async ({ property }) => {
  const {
    _id: id,
    title,
    views,
    likes,
    shares,
    // images,
    location: { state, city },
    details: { bathrooms, bedrooms, area } = {},
    availability: { rentalPeriod: { startDate = "", endDate = "" } = {} } = {},
    price,
    category,
    createdAt,
    isContractBased,
  } = property;
  const rate = (await getCurrencyRate(price.currency)) as CurrencyRate;

  return (
    <Card className="relative grid grid-cols-[35.836627140974967%_1fr] gap-2">
      <CardImage>
        <Image
          src={"/property.jpg"}
          fill
          alt="property title"
          className="bg-[#9f9aa6] object-cover"
        />
      </CardImage>

      <CardContent className="p-0 font-medium">
        <div className="flex gap-2 text-xs 2xl:text-sm">
          {startDate && (
            <span>
              Created date {formatDateFromISODate(createdAt as string)}
            </span>
          )}
          {endDate && (
            <span>End date {formatDateFromISODate(endDate as string)}</span>
          )}
        </div>

        <CardStats
          dict={}
          className="mt-4 flex gap-4 text-base"
          type="social"
          views={views}
          shares={likes}
          likes={shares}
          lang={lang}
        />
        <CardTitle className="mt-4 text-sm">{title?.en}</CardTitle>
        <CardLocation
          dict={{}}
          className="mt-4"
          location={`${city}, ${state}`}
        />
        <CardStats
          className="mt-4 font-bold"
          type="property"
          bedroom={bedrooms}
          bathroom={bathrooms}
          area={area}
          lang={lang}
        />
        {!isContractBased && (
          <CardFooter className="mt-4 p-0 font-bold text-secondary">
            <Price isCard={true} price={price} rate={rate} />

            {category == "rent" && (
              <span className="ml-1.5 text-sm font-semibold text-foreground">
                per month
              </span>
            )}
          </CardFooter>
        )}
      </CardContent>
      <Link
        href={`/dashboard/properties/${id}`}
        className="absolute inset-0"
      ></Link>
    </Card>
  );
};
