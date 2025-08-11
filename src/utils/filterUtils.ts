type FilterType = {
  category: string;
  status: "published" | "draft" | "archive";
};

export const handleFilterParams = (
  filterValues: Partial<FilterType>,
  currentParams: URLSearchParams,
): URLSearchParams => {
  const params = new URLSearchParams(currentParams.toString());

  if (filterValues.status) {
    if (["draft", "archive"].includes(filterValues.status)) {
      params.delete("category");
      params.set("status", filterValues.status);
    } else {
      params.set("status", "published");
    }
  }

  if (filterValues.category) {
    if (["buy", "rent", "daily rent"].includes(filterValues.category)) {
      params.set("category", filterValues.category);
      params.delete("status");
    } else {
      params.delete("category");
    }
  }

  return params;
};
