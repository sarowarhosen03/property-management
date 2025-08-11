"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { getFeatureList } from "@/components/common/single-product/_components/FeatureList";
import { Accordion } from "@/components/ui/accordion";
import { useActiveFilterClass, useFilter } from "@/hooks";
import { SearchPage } from "@/lib/db/type";
import ApartmentIconFilled from "@/svgs/apartment-filled.svg";
import ApartmentIconStroke from "@/svgs/apartment-stoke.svg";
import CommercialIconFilled from "@/svgs/commercial-filled.svg";
import CommercialIconStroke from "@/svgs/commercial-stroke.svg";
import LandIcon from "@/svgs/land.svg";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AdditionalFilter from "../_components/AdditionalFilter";
import BuildingTypeCheckbox from "../_components/BuildingTypeCheckbox";
import HouseRange from "../_components/HouseRange";
import HouseTypeCheckbox from "../_components/HouseTypeCheckbox";
import PriceFilter from "../_components/PriceFilter";
import ProvidenceFilter from "../_components/ProvidenceFilter";
import RenovationFilter from "../_components/RenovationFilter";
import SqRange from "../_components/SqRange";
import TypeCheckbox from "../_components/TypeCheckbox";
import UtilitiesFilter from "../_components/UtilitiesFilter";

import BuildingIconFilled from "@/svgs/building-filled.svg";
import BuildingIconStroke from "@/svgs/building.svg";
import SignificanceTypeCheckbox from "../_components/SignificanceTypeCheckbox";

const landUtilities = {
  en: [{ name: "fenced", label: "Fenced" }],
  hy: [{ name: "fenced", label: "Ցանկապատված" }],
  rus: [{ name: "fenced", label: "Огороженный" }],
};

function SideBarComp({ dict }: { dict: SearchPage }) {
  const searchParams = useSearchParams();
  const { lang }: { lang: langType } = useParams();
  const filterType = searchParams.get("type") || "";
  const handleFilter = useFilter({
    filterType: "type",
  });

  const activeClasses = useActiveFilterClass({
    filterType: "type",
  });

  const isCommercial = ["commercial", "land"].includes(filterType);

  const ft = getFeatureList(
    searchParams.get("type") || ("buy" as any),
    lang,
  ) as any;

  return (
    <>
      <div>
        <div className="mb-8 grid grid-cols-2 gap-4 lg:mb-10 xl:gap-6">
          <div
            onClick={() => handleFilter({ action: "apartment" })}
            className={`group flex aspect-square cursor-pointer justify-center rounded-3xl border border-secondary-700 p-4 text-secondary-700 duration-100 hover:bg-secondary-700 hover:text-white ${activeClasses({ action: "apartment" }) ? "active bg-secondary-700 text-white" : ""}`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="group-hover:hidden group-[.active]:hidden md:max-lg:scale-75">
                <ApartmentIconStroke />
              </div>
              <div className="hidden group-hover:block group-[.active]:block md:max-lg:scale-75">
                <ApartmentIconFilled />
              </div>

              <span className="font-medium md:max-xl:text-xs lg:mt-4">
                {dict.apartment}
              </span>
            </div>
          </div>
          <div
            onClick={() => handleFilter({ action: "house" })}
            className={`group flex aspect-square cursor-pointer justify-center rounded-3xl border border-secondary-700 p-4 text-secondary-700 duration-100 hover:bg-secondary-700 hover:text-white ${activeClasses({ action: "house" }) ? "active bg-secondary-700 text-white" : ""}`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="group-hover:hidden group-[.active]:hidden md:max-lg:scale-75">
                <BuildingIconStroke />
              </div>
              <div className="hidden group-hover:block group-[.active]:block md:max-lg:scale-75">
                <BuildingIconFilled />
              </div>
              <span className="font-medium md:max-xl:text-xs lg:mt-4">
                {dict.house}
              </span>
            </div>
          </div>
          <div
            onClick={() => handleFilter({ action: "commercial" })}
            className={`group flex aspect-square cursor-pointer justify-center rounded-3xl border border-secondary-700 p-4 text-secondary-700 duration-100 hover:bg-secondary-700 hover:text-white ${activeClasses({ action: "commercial" }) ? "active bg-secondary-700 text-white" : ""}`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="group-hover:hidden group-[.active]:hidden md:max-lg:scale-75">
                <CommercialIconStroke />
              </div>
              <div className="hidden group-hover:block group-[.active]:block md:max-lg:scale-75">
                <CommercialIconFilled />
              </div>
              <span className="font-medium md:max-xl:text-xs lg:mt-4">
                {dict.commercial}
              </span>
            </div>
          </div>
          <div
            onClick={() => handleFilter({ action: "land" })}
            className={`flex aspect-square cursor-pointer justify-center rounded-3xl border border-secondary-700 p-4 text-secondary-700 duration-100 hover:bg-secondary-700 hover:text-white ${activeClasses({ action: "land" }) ? "bg-secondary-700 text-white" : ""}`}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <LandIcon className="scale-[1.6] md:max-lg:scale-75" />

              <span className="font-medium md:max-xl:text-xs lg:mt-4">
                {dict.land}
              </span>
            </div>
          </div>
        </div>
        {/* Filter */}
        <div className="mb-8">
          <TypeCheckbox lang={lang} isCommercial={isCommercial} />
        </div>

        {filterType === "house" && (
          <HouseTypeCheckbox lang={lang} houseType={dict.houseType} />
        )}

        {/* Significance Types */}
        {(filterType === "commercial" || filterType === "land") && (
          <div className="mt-8">
            <SignificanceTypeCheckbox
              type={filterType}
              title={dict.Significance}
              lang={lang}
            />
          </div>
        )}
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-3"
        >
          <ProvidenceFilter province={dict.province} district={dict.distric} />
          <PriceFilter dict={dict} filterType={filterType} lang={lang} />
          {/* Building types */}
          {filterType !== "land" && (
            <BuildingTypeCheckbox
              type={filterType}
              lang={lang}
              buildingType={dict.buildingTypes}
            />
          )}

          {/* Working some  */}
          {filterType === "land" && (
            <div className="mt-8">
              <SqRange sqRange={dict["Land surface (sq/m)"]} />
            </div>
          )}

          {filterType !== "land" && (
            <div className="mt-8">
              <SqRange
                sqRange={
                  !(
                    filterType === "apartment" ||
                    filterType === "house" ||
                    filterType === "commercial"
                  )
                    ? dict["houseArea"]
                    : filterType === "apartment"
                      ? dict["floorAreaTitleApartment"]
                      : dict["Land surface (sq/m)"]
                }
              />
            </div>
          )}
          {filterType === "commercial" && (
            <div className="mt-8">
              <HouseRange houseRange={dict["houseArea"]} />
            </div>
          )}

          {filterType !== "land" && (
            <>
              {filterType !== "commercial" && (
                <>
                  {/* <div className="mt-8">
                    <GardenRange gardenRange={dict.gardenSqMiterRange} />
                  </div> */}
                  {filterType === "house" && (
                    <div className="mt-8">
                      <HouseRange houseRange={dict.houseSqMiterRange} />
                    </div>
                  )}
                </>
              )}

              <RenovationFilter
                {...{
                  lang,
                  renovations: dict.renovations,
                }}
              />
              {ft?.Utilities?.length > 0 && (
                <UtilitiesFilter
                  {...{
                    lang,
                    utilities: dict.utilities,
                    utilitList: ft.Utilities,
                  }}
                />
              )}

              {ft?.Additional?.length > 0 && (
                <AdditionalFilter
                  {...{
                    lang,
                    aditionals: dict.aditionals,
                    AdditionalList: ft.Additional,
                  }}
                />
              )}
            </>
          )}
          {filterType === "land" && (
            <>
              {ft?.Utilities?.length > 0 && (
                <UtilitiesFilter
                  {...{
                    lang,
                    utilities: dict.utilities,
                    utilitList: landUtilities[lang],
                  }}
                />
              )}
            </>
          )}
        </Accordion>
      </div>
    </>
  );
}

export default function SideBar({ dict }: { dict: SearchPage }) {
  return (
    <Suspense>
      <SideBarComp dict={dict} />
    </Suspense>
  );
}
