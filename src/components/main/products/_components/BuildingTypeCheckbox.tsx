import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const buildingFiltersArray = {
  en: [
    { name: "Stone", label: "Stone" },
    { name: "Panels", label: "Panels" },
    { name: "Cassette", label: "Cassette" },
    { name: "Monolith", label: "Monolith" },
    { name: "New Construction", label: "New Construction" },
    { name: "Duplex", label: "Duplex" },
    { name: "Special project", label: "Special project" },
  ],
  rus: [
    { name: "Stone", label: "Каменный" },
    { name: "Panels", label: "Панели" },
    { name: "Cassette", label: "Кассетный" },
    { name: "Monolith", label: "Монолитный" },
    { name: "New Construction", label: "Новое строительство" },
    { name: "Duplex", label: "Дуплекс" },
    { name: "Special project", label: "Специальный проект" },
  ],
  hy: [
    { name: "Stone", label: "Քարե" },
    { name: "Panels", label: "Պանելային" },
    { name: "Cassette", label: "Կասետային" },
    { name: "Monolith", label: "Մոնոլիտ" },
    { name: "New Construction", label: "Նոր շինություն" },
    { name: "Duplex", label: "Դուպլեքս" },
    { name: "Special project", label: "Հատուկ նախագիծ" },
  ],
};
const buildingFiltersArrayForHouse = {
  en: [
    { name: "stone", label: "Stone" },
    { name: "bricks", label: "Bricks" },
    { name: "wooden", label: "Wooden" },
  ],
  hy: [
    { name: "stone", label: "Քարե" },
    { name: "bricks", label: "Աղյուսե" },
    { name: "wooden", label: "Փայտե" },
  ],
  rus: [
    { name: "stone", label: "Камень" },
    { name: "bricks", label: "Кирпич" },
    { name: "wooden", label: "Деревянный" },
  ],
};
const buildingFiltersArrayForCommercial = {
  en: [
    { name: "panel", label: "Panels" },
    { name: "stone", label: "Stone" },
    { name: "new construction", label: "New Construction" },
  ],
  hy: [
    { name: "panel", label: "Պանելային" },
    { name: "stone", label: "Քարե" },
    { name: "new construction", label: "Նորակառույց" },
  ],
  rus: [
    { name: "panel", label: "Панели" },
    { name: "stone", label: "Камень" },
    { name: "new construction", label: "Новое строительство" },
  ],
};

const constructionType = {
  en: "Construction type",
  hy: "Շինություն",
  rus: "Тип конструкции",
};

export default function BuildingTypeCheckbox({
  buildingType,
  lang,
  type,
}: {
  type: string;
  buildingType: string;
  lang: langType;
}) {
  const isApertment = type === "apartment";
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2" className="mt-8 border-none">
          <AccordionTrigger>
            <h2 className="text-lg font-semibold">
              {isApertment ? constructionType[lang] : buildingType}
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <CheckboxFilter
                filtersArray={
                  type === "house"
                    ? buildingFiltersArrayForHouse[lang]
                    : type === "commercial"
                      ? buildingFiltersArrayForCommercial[lang]
                      : buildingFiltersArray[lang]
                }
                queryKey={"buildingType"}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
