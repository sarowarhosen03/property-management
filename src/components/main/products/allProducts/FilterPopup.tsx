"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { Button } from "@/components/ui/button";
import { SearchPage } from "@/lib/db/type";
import FilterSide from "@/svgs/filter-side.svg";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { TypeSelectorButton } from "./filter/FilterTypes";
import SideBar from "./SideBar";

import CloseIcon from "@/svgs/close.svg";

export default function FilterPopup({
  searchDictionary,
}: {
  searchDictionary: SearchPage;
}) {
  const searchPerams = useSearchParams();

  const expanded = searchPerams.get(`expand`) || false;

  const [popupOpen, setPopupOpen] = useState(expanded);
  const { replace } = useRouter();
  const { lang }: { lang: langType } = useParams();
  useEffect(() => {
    if (!popupOpen && expanded) {
      const newSearchPerams = new URLSearchParams(searchPerams.toString());
      newSearchPerams.delete("expand");
      replace(`/${lang}/properties?${newSearchPerams.toString()}`);
    }
  }, [expanded, lang, popupOpen, replace, searchPerams]);
  return (
    <>
      <FilterSide
        className={`${popupOpen ? "-right-9" : "right-0"} fixed bottom-10 z-50 flex translate-x-0 transform cursor-pointer items-center transition-transform md:hidden`}
        onClick={(e) => {
          e.stopPropagation();
          setPopupOpen((prev) => !prev);
        }}
      />
      <section
        className={`fixed inset-0 z-[100] transform overflow-y-auto bg-white transition-transform md:hidden ${
          popupOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full items-center justify-between p-4 px-6 text-lg">
          <span className="text-lg font-semibold text-secondary">
            {searchDictionary.filter}
          </span>
          <CloseIcon
            onClick={() => setPopupOpen(false)}
            className="text-secondary"
          />
        </div>

        <div className="flex flex-col px-4 pb-10 pt-4">
          <Suspense>
            <TypeSelectorButton dict={searchDictionary} />
          </Suspense>
          <div className="sidebar mt-8 md:block">
            <Suspense>
              <SideBar dict={searchDictionary} />
            </Suspense>
          </div>
          <Button
            onClick={() => {
              replace(`/${lang}/properties`);
              setPopupOpen(false);
            }}
            variant={"ghost"}
            size={"md"}
            className="mt-8 w-full text-lg font-semibold"
          >
            {searchDictionary.resetAll}
          </Button>
          <Button
            onClick={() => setPopupOpen(false)}
            variant={"primary"}
            size={"lg"}
            className="mt-4 h-12 w-full"
          >
            {" "}
            {searchDictionary.filter}
          </Button>
        </div>
        {/* Content of the popup goes here */}
      </section>
    </>
  );
}
