import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const significanceOptionsForCommercial = {
  en: [
    { name: "office space", label: "Office space" },
    { name: "service area", label: "Service Area" },
    { name: "trade area", label: "Trade Area" },
    { name: "workshop", label: "Workshop" },
    { name: "warehouse", label: "Warehouse" },
    { name: "building/construction", label: "Building/Construction" },
    { name: "universal area", label: "Universal Area" },
    { name: "hotel", label: "Hotel" },
  ],
  hy: [
    { name: "office space", label: "Օֆիսային տարածք" },
    { name: "service area", label: "Սպասարկման տարածք" },
    { name: "trade area", label: "Առևտրի տարածք" },
    { name: "workshop", label: "Արտադրամաս" },
    { name: "warehouse", label: "Պահեստ" },
    { name: "building/construction", label: "Շենք/շինություն" },
    { name: "universal area", label: "Ունիվերսալ տարածք" },
    { name: "hotel", label: "Հյուրանոց" },
  ],
  rus: [
    { name: "office space", label: "Офисное помещение" },
    { name: "service area", label: "Сервисная зона" },
    { name: "trade area", label: "Торговая зона" },
    { name: "workshop", label: "Мастерская" },
    { name: "warehouse", label: "Склад" },
    { name: "building/construction", label: "Здание/Строительство" },
    { name: "universal area", label: "Универсальная зона" },
    { name: "hotel", label: "Гостиница" },
  ],
};

const significanceOptions = {
  en: [
    { name: "residential", label: "Residential" },
    { name: "commercial", label: "Commercial" },
    { name: "land", label: "Land" },
    { name: "garden", label: "Garden" },
    { name: "other", label: "Other" },
  ],
  hy: [
    { name: "residential", label: "Բնակելի" },
    { name: "commercial", label: "Կոմերցիոն" },
    { name: "land", label: "Հողամաս" },
    { name: "garden", label: "Այգի" },
    { name: "other", label: "Այլ" },
  ],
  rus: [
    { name: "residential", label: "Жилой" },
    { name: "commercial", label: "Коммерческий" },
    { name: "land", label: "Земля" },
    { name: "garden", label: "Сад" },
    { name: "other", label: "Другое" },
  ],
};

export default function SignificanceTypeCheckbox({
  type,
  lang,
  title,
}: {
  title: string;
  type: string;
  lang: langType;
}) {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2" className="border-none">
          <AccordionTrigger>
            <h2 className="text-lg font-semibold">{title}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <CheckboxFilter
                filtersArray={
                  type === "commercial"
                    ? significanceOptionsForCommercial[lang]
                    : significanceOptions[lang]
                }
                queryKey={"significance"}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
