import CheckboxFilter from "@/components/common/filter-components/checkbox-filter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DistrictFilter({ districts }: { districts: string[] }) {
  return (
    <>
      <AccordionItem value="item-4" className="border-none">
        <AccordionTrigger>
          <h2 className="text-lg font-semibold">District</h2>
        </AccordionTrigger>
        <AccordionContent vocab="item-4">
          <div className="space-y-2">
            <CheckboxFilter filtersArray={districts} queryKey={"city"} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
