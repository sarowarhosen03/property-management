"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

const PropertySearchFormComp = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [searchTerms, setSearchTerms] = useState({
    propertyId: "",
    address: "",
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((terms: { propertyId?: string; address?: string }) => {
        const params = new URLSearchParams(searchParams);
        if (terms.propertyId) {
          params.set("_id", terms.propertyId);
        } else {
          params.delete("_id");
        }
        if (terms.address) {
          params.set("address", terms.address);
        } else {
          params.delete("address");
        }
        replace(`?${params.toString()}`);
      }, 300),
    [searchParams, replace],
  );

  useEffect(() => {
    debouncedSearch(searchTerms);
  }, [searchTerms, debouncedSearch]);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <Label htmlFor="propertyId" className="mb-1 ml-3 font-normal">
          Properties ID
        </Label>
        <Input
          id="propertyId"
          type="text"
          placeholder="Search by properties ID"
          className="h-7 rounded-full border-secondary-500 text-foreground"
          onChange={onChange}
          name="propertyId"
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="address" className="mb-1 ml-3 font-normal">
          Address
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="Search by address"
          className="h-7 rounded-full border-secondary-500 text-foreground"
          onChange={onChange}
          name="address"
        />
      </div>
    </div>
  );
};

export default function PropertySearchForm() {
  return (
    <Suspense>
      <PropertySearchFormComp />
    </Suspense>
  );
}
