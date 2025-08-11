import { langType } from "@/app/[lang]/(main)/page";
import { locales } from "@/lib/internationlization";

const StudioApt = {
  en: "Studio Apt",
  hy: "Ստուդիա",
  rus: "Студия",
};
const RoomIn = {
  en: "Room in",
  hy: "Սենյակ -ում",
  rus: "Комната в",
};

const RoomsIn = {
  en: "Rooms in",
  hy: "Սենյակներ -ում",
  rus: "Комнаты в",
};
const m = {
  en: "m²",
  hy: "մ²",
  rus: "м²",
};
const floorDict = {
  en: "floor",
  hy: "հարկ",
  rus: "этаж",
};

const renovationOptions = {
  en: [
    { value: "no renovation", label: "No Renovation" },
    { value: "needs renovation", label: "Needs Renovation" },
    { value: "cosmetic renovation", label: "Cosmetic Renovation" },
    { value: "major renovation", label: "Major Renovation" },
    { value: "designer renovation", label: "Designer Renovation" },
  ],
  hy: [
    { value: "no renovation", label: "Առանց վերանորոգման" },
    { value: "needs renovation", label: "Վերանորոգման կարիք ունի" },
    { value: "cosmetic renovation", label: "Կոսմետիկ վերանորոգում" },
    { value: "major renovation", label: "Կապիտալ վերանորոգում" },
    { value: "designer renovation", label: "Դիզայներական վերանորոգում" },
  ],
  rus: [
    { value: "no renovation", label: "Без ремонта" },
    { value: "needs renovation", label: "Требуется ремонт" },
    { value: "cosmetic renovation", label: "Косметический" },
    { value: "major renovation", label: "Капитальный" },
    { value: "designer renovation", label: "Дизайнерский" },
  ],
};

const listingType = {
  en: [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
  ],
  hy: [
    { value: "house", label: "Տուն" },
    { value: "apartment", label: "Բնակարան" },
    {
      value: "commercial",
      label: "Առևտրային տարածք",
    },
    { value: "land", label: "Հողատարածք" },
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

export default function generateTitle({
  bedrooms,
  type,
  area,
  totalAreas,
  floorNumber,
  totalFloors,
  renovation,
}: {
  bedrooms: string;
  type: string;
  area: string;
  totalAreas: string | undefined;
  floorNumber: string | undefined;
  totalFloors: string | undefined;
  renovation: string;
}) {
  let alltitile = {
    en: "",
    hy: "",
    rus: "",
  };
  locales.forEach((localItem) => {
    const item: langType = localItem.code;
    let generatedTitle = "";
    if (Number.isInteger(Number(bedrooms))) {
      generatedTitle += `${Number(bedrooms) === 0 ? `${StudioApt[item]} ` : Number(bedrooms) === 1 ? Number(bedrooms) + ` ${RoomIn[item]} ` : Number(bedrooms) + ` ${RoomsIn[item]} `}`;
    }
    const findTypeIndex = listingType.en.findIndex(
      (typeItem) => type === typeItem.value,
    );

    generatedTitle += `${listingType[item][findTypeIndex].label} , `;

    if (totalAreas || area) {
      generatedTitle += `${totalAreas || area}${m[item]} , `;
    }

    if (type === "house" && Number(totalFloors)) {
      generatedTitle += `${totalFloors} ${floorDict[item]} , `;
    } else if (
      type === "apartment" &&
      Number(floorNumber) > 0 &&
      Number(totalFloors) > 0
    ) {
      generatedTitle += `${floorNumber}/${totalFloors} ${floorDict[item]} , `;
    }

    if (renovation) {
      const renoIndex = renovationOptions.en.findIndex(
        (renoItem) => renovation === renoItem.value,
      );
      generatedTitle += `${renovationOptions[item][renoIndex].label}`;
    }
    alltitile[item] = generatedTitle;
  });
  return alltitile;
}
