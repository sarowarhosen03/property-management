import { langType } from "@/app/[lang]/(main)/page";
import { SingeProperty } from "@/lib/db/type";
import { getSpacialOffers } from "@/lib/getSpacialProperty";
import { Property } from "@/types/fetchDataTypes";
import Properties from "./Properties";

export default async function SpecialProducts({
  singePropertyDict,
  location,
  price,
  type,
  category,
  id,
  lang,
}: {
  location: string;
  price: number;
  singePropertyDict: SingeProperty;
  type: string;
  category: string;
  id: string;
  lang: langType;
}) {
  const { data: properties } = await getSpacialOffers({
    category,
    type,
    minPrice: price - price * 0.4,
    maxPrice: price + price * 0.9,
    location,
  });

  const specialProperties = properties?.filter(
    (prop: Property) => prop._id !== id,
  );

  return <Properties lang={lang} properties={specialProperties} />;
}
