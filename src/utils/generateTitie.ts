import { langType } from "@/app/[lang]/(main)/page";
const IND = {
  en: "in",
  hy: "Մեջ",
  rus: "В",
};

const houseTypes = {
  en: [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
  ],
  hy: [
    { value: "house", label: "Առանձնատուն" },
    { value: "apartment", label: "Բնակարան" },
    { value: "commercial", label: "Կոմերցիոն" },
    { value: "land", label: "Հող" },
  ],
  rus: [
    { value: "house", label: "Дом" },
    { value: "apartment", label: "Квартира" },
    {
      value: "commercial",
      label: "Коммерческая недвижимость",
    },
    { value: "land", label: "Земля" },
  ],
};

export default function generateTitie({
  lang,
  city,
  type,
}: {
  lang: langType;
  type: string;
  city: string;
}) {
  const translatedType = houseTypes[lang].find(
    (item) => item.value.toLowerCase() === type.toLocaleLowerCase(),
  )?.label;
  return `${translatedType} `;
}
