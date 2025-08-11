"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
type SingleOption = {
  name: string;
  label: string;
}[];
const CheckboxFilterC = ({
  filtersArray,
  queryKey,
}: {
  filtersArray: SingleOption;
  queryKey: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const [query, setQuery] = useState<string[]>([]);

  const handleCheckFilter = (checked: boolean, value: string) => {
    if (checked) {
      setQuery((prev) => [...prev, value]);
    } else {
      const filtered = query.filter((qu) => qu !== value);
      setQuery(filtered);
    }
  };

  useEffect(() => {
    if (queryParams.get(queryKey)) {
      const queryStr = queryParams.get(queryKey);
      const query = queryStr ? decodeURI(queryStr).split(",") : [];
      setQuery(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey]);

  useEffect(() => {
    if (query.length > 0) {
      const queryString = query.join(",");
      queryParams.set(queryKey, encodeURI(queryString));
    } else {
      queryParams.delete(queryKey);
    }
    router.replace(pathname + "?" + queryParams.toString(), { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, queryKey, pathname]);

  return (
    <>
      <div className="space-y-4">
        {filtersArray?.map((value) => (
          <div key={value.name} className="flex items-center gap-2">
            <Checkbox
              className="bg-white"
              id={value.name}
              value={value.name}
              checked={query.includes(value.name)}
              onCheckedChange={(checked: boolean) =>
                handleCheckFilter(checked, value.name)
              }
            />
            <Label
              htmlFor={value.name}
              className="cursor-pointer text-secondary-600"
            >
              {value.label}
            </Label>
          </div>
        ))}
      </div>
    </>
  );
};

export default function CheckboxFilter({
  filtersArray,
  queryKey,
}: {
  filtersArray: SingleOption;
  queryKey: string;
}) {
  return (
    <Suspense>
      <CheckboxFilterC {...{ filtersArray, queryKey }} />
    </Suspense>
  );
}
