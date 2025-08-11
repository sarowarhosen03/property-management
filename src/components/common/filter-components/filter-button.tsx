import { Button } from "@/components/ui/button";
import { useActiveFilterClass, useFilter } from "@/hooks";

export default function FilterButton({
  title,
  filterType,
  filterOptions,
  byIndex = false,
}: {
  title: string;
  filterType: string;
  filterOptions: { value: string; label: string }[];
  byIndex?: boolean;
  multiple?: boolean;
}) {
  const handleFilter = useFilter({ filterType });
  const activeClasses = useActiveFilterClass({ filterType });

  return (
    <>
      <div className="mt-8">
        <h2 className="mb-4 text-left text-lg font-semibold">{title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((option, i) => (
            <Button
              key={option.value}
              variant={"outline"}
              size={"sm"}
              className={`aspect-square ${activeClasses({ action: byIndex ? i.toString() : option.value, filterType }) ? "bg-secondary text-light" : ""}`}
              onClick={() =>
                handleFilter({
                  action: byIndex ? i.toString() : option.value,
                  filterType,
                  toggle: true,
                  multiple: true,
                })
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

// Usage example
// const filterOptions = ["1", "2", "3", "4", "5+"];

// function NumberOfFloor() {
//   return (
//     <FilterComponent
//       title="Number of floor"
//       filterType="floor"
//       filterOptions={filterOptions}
//     />
//   );
// }
