"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminProperties } from "@/lib/db/type";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const PropertySearchForm = ({ dict }: { dict: AdminProperties }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [searchTerms, setSearchTerms] = useState({
    propertyId: searchParams.get("_id") || "",
    address: searchParams.get("location") || "",
  });

  // Debounced function to update the search query
  const debouncedSearch = useCallback(
    debounce((terms: { propertyId?: string; address?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (terms.propertyId) {
        params.set("_id", terms.propertyId);
      } else {
        params.delete("_id");
      }

      if (terms.address) {
        params.set("location", terms.address);
      } else {
        params.delete("location");
      }

      replace(`?${params.toString()}`);
    }, 300),
    [searchParams, replace],
  );

  useEffect(() => {
    debouncedSearch(searchTerms);

    return () => {
      debouncedSearch.cancel(); // Cleanup function to cancel pending debounce calls
    };
  }, [searchTerms, debouncedSearch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <Label htmlFor="propertyId" className="mb-1 ml-3 font-normal">
          {dict.propertiId}
        </Label>
        <Input
          id="propertyId"
          type="text"
          placeholder={dict.searchByPropertiId}
          className="h-7 rounded-full border-secondary-500 text-foreground"
          onChange={onChange}
          name="propertyId"
          value={searchTerms.propertyId}
        />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="address" className="mb-1 ml-3 font-normal">
          {dict.address}
        </Label>
        <Input
          id="address"
          type="text"
          placeholder={dict.searchByAddress}
          className="h-7 rounded-full border-secondary-500 text-foreground"
          onChange={onChange}
          name="address"
          value={searchTerms.address}
        />
      </div>
    </div>
  );
};

export default PropertySearchForm;
