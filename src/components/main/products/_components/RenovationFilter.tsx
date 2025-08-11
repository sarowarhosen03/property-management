import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const renovationFiltersArray = {
  en: [
    { name: "no renovation", label: "No Renovation" },
    { name: "needs renovation", label: "Needs Renovation" },
    { name: "cosmetic renovation", label: "Cosmetic Renovation" },
    { name: "major renovation", label: "Major Renovation" },
    { name: "designer renovation", label: "Designer Renovation" },
  ],
  hy: [
    { name: "no renovation", label: "Առանց վերանորոգման" },
    { name: "needs renovation", label: "Վերանորոգման կարիք ունի" },
    { name: "cosmetic renovation", label: "Կոսմետիկ վերանորոգում" },
    { name: "major renovation", label: "Կապիտալ վերանորոգում" },
    { name: "designer renovation", label: "Դիզայներական վերանորոգում" },
  ],
  rus: [
    { name: "no renovation", label: "никакого ремонта" },
    { name: "needs renovation", label: "Требуется ремонт" },
    { name: "cosmetic renovation", label: "Косметический" },
    { name: "major renovation", label: "Капитальный" },
    { name: "designer renovation", label: "Дизайнерский" },
  ],
};

export default function RenovationFilter({
  lang,
  renovations,
}: {
  lang: langType;
  renovations: string;
}) {
  return (
    <>
      <AccordionItem value="item-5" className="mt-9 border-none">
        <AccordionTrigger>
          <h2 className="text-lg font-semibold">{renovations}</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <CheckboxFilter
              filtersArray={renovationFiltersArray[lang]}
              queryKey={"renovation"}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
