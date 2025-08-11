import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const floorFiltersArray = {
  en: [
    { name: "Stone", label: "Stone" },
    { name: "Panels", label: "Panels" },
    { name: "Monolith", label: "Monolith" },
    { name: "Duplex", label: "Duplex" },
    { name: "Cassette", label: "Cassette" },
    { name: "Special project", label: "Special project" },
  ],
  rus: [
    { name: "Stone", label: "Каменный" },
    { name: "Panels", label: "Панели" },
    { name: "Monolith", label: "Монолитный" },
    { name: "Duplex", label: "Дуплекс" },
    { name: "Cassette", label: "Кассетный" },
    { name: "Special project", label: "Специальный проект" },
  ],
  hy: [
    { name: "Stone", label: "Քարե" },
    { name: "Panels", label: "Պանելային" },
    { name: "Monolith", label: "Մոնոլիտ" },
    { name: "Duplex", label: "Դուպլեքս" },
    { name: "Cassette", label: "Կասետային" },
    { name: "Special project", label: "Հատուկ նախագիծ" },
  ],
};

export default function FloorFilter({
  lang,
  floor,
}: {
  lang: langType;
  floor: string;
}) {
  return (
    <>
      <AccordionItem value="item-8" className="border-none">
        <AccordionTrigger>
          <h2 className="text-lg font-semibold">{floor}</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <CheckboxFilter
              filtersArray={floorFiltersArray[lang]}
              queryKey={"totalFloors"}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
