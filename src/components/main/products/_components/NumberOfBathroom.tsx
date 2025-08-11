import FilterButton from "@/components/common/filter-components/filter-button";

const filterOptions = ["1", "2", "3", "4", "5+"];
export default function NumberOfBathroom() {
  return (
    <FilterButton
      filterOptions={filterOptions}
      filterType={"bathrooms"}
      title={"Number of bathrooms"}
    />
  );
}
