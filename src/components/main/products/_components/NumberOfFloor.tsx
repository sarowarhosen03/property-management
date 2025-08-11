import FilterButton from "@/components/common/filter-components/filter-button";

const filterOptions = ["1", "2", "3", "4", "5+"];
export default function NumberOfFloor() {
  return (
    <FilterButton
      filterOptions={filterOptions}
      filterType={"totalFloors"}
      title={"Number of floors"}
    />
  );
}
