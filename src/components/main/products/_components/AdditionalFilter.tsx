import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdditionalFilter({
  aditionals,
  AdditionalList,
}: {
  AdditionalList: {
    name: string;
    label: string;
  }[];
  aditionals: string;
  lang: langType;
}) {
  return (
    <>
      <AccordionItem value="item-7" className="mt-8 border-none">
        <AccordionTrigger>
          <h2 className="text-lg font-semibold">{aditionals}</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <CheckboxFilter
              filtersArray={AdditionalList}
              queryKey={"additionalUtilities"}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
