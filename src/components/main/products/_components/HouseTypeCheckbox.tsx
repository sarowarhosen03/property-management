import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const houseTypeArray = {
  en: [
    { name: "house", label: "House" },
    { name: "luxury private house", label: "Luxury Private House" },
    { name: "townhouses", label: "Townhouse" },
    { name: "country House", label: "Country House" },
  ],
  hy: [
    { name: "house", label: "Տուն" },
    { name: "luxury private house", label: "Շքեղ առանձնատուն" },
    { name: "townhouses", label: "Թաուն Հաուս" },
    { name: "country House", label: "Ամառանոց" },
  ],
  rus: [
    { name: "house", label: "Дом" },
    { name: "luxury private house", label: "Роскошный частный дом" },
    { name: "townhouses", label: "Таунхаусы" },
    { name: "country House", label: "Загородный дом" },
  ],
};

export default function HouseTypeCheckbox({
  houseType,
  lang,
}: {
  houseType: string;
  lang: langType;
}) {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2" className="border-none">
          <AccordionTrigger>
            <h2 className="text-lg font-semibold">{houseType}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <CheckboxFilter
                filtersArray={houseTypeArray[lang]}
                queryKey={"houseType"}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
