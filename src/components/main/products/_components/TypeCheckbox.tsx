"use client";
import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
const houseFiltersArray = {
  en: [
    { name: "Investment", label: "Investment" },
    { name: "New construction", label: "New construction" },
    { name: "By Developer", label: "By Developer" },
  ],
  hy: [
    { name: "Investment", label: "Ներդրումային" },
    { name: "New construction", label: "Նորակառույց" },
    { name: "By Developer", label: "Շինարարից" },
  ],
  rus: [
    { name: "Investment", label: "Инвестиции" },
    { name: "New construction", label: "Новое строительство" },
    { name: "By Developer", label: "От застройщика" },
  ],
};

export default function TypeCheckbox({
  isCommercial,
  lang,
}: {
  isCommercial?: boolean;
  lang: langType;
}) {
  return (
    <CheckboxFilter
      filtersArray={houseFiltersArray[lang]}
      queryKey={"projectType"}
    />
  );
}
