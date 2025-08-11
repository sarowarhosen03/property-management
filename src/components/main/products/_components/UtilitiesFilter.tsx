import { langType } from "@/app/[lang]/(main)/page";
import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function UtilitiesFilter({
  utilities,
  lang,
  utilitList,
}: {
  lang: langType;
  utilities: string;
  utilitList: {
    name: string;
    label: string;
  }[];
}) {

  return (
    <>
      <AccordionItem value="item-6" className="mt-8 border-none">
        <AccordionTrigger>
          <h2 className="text-lg font-semibold">{utilities}</h2>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <CheckboxFilter filtersArray={utilitList} queryKey={"utilities"} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
