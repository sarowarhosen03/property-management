"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hero } from "@/lib/db/type";
import FilterSide from "@/svgs/filter-side.svg";
import { useRouter } from "next/navigation";

import { langType } from "@/app/[lang]/(main)/page";
import RangeFilterHome from "@/components/common/filter-components/reangeFilterHome";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import { getProvidenceName, providenceDistricList } from "@/utils/Areas";
import {
  RANGE_MAX_VALUE,
  RANGE_MIN,
  RANGE_MIN_VALUE,
  RANGE_STEP,
} from "@/utils/constant";
import { useEffect, useState } from "react";
import Locationselector from "./filter/Locationselector";
import RoomSelector from "./filter/RoomSelector";
import SelectCheckBox from "./filter/SelectCheckBox";
import FilterOptions from "./FilterOptions";
import { icons } from "./icons";

const CheckboxOption = {
  commercial: {
    en: [
      "Office space",
      "Service Area",
      "Trade Area",
      "Workshop",
      "Warehouse",
      "Building/Construction",
      "Universal Area",
    ],
    rus: [
      "Офисное пространство",
      "Зона обслуживания",
      "Торговая зона",
      "Мастерская",
      "Склад",
      "Строительство",
      "Универсальная зона",
    ],
    hy: [
      "Օֆիսային տարածք",
      "Սպասարկման տարածք",
      "Առևտրի տարածք",
      "Արտադրամաս",
      "Պահեստ",
      "Շենք/շինություն",
      "Ունիվերսալ տարածք",
    ],
  },
  land: {
    en: ["Residential", "Commercial", "Land", "Garden", "Other"],
    rus: ["Жилая", "Коммерческая", "Земля", "Сад", "Другое"],
    hy: ["Բնակելի", "Կոմերցիոն", "Հող", "Այգի", "Այլ"],
  },
};

export default function FilterLandingPage({
  dict,
  lang,
}: {
  dict: Hero;
  lang: langType;
}) {
  const { setSelectedCategory } = useStore();
  const [significant, setSignificant] = useState<string[]>([]);
  const [selectedButton, setSelectedButton] = useState<number[]>([]);
  const [category, setCategory] = useState("buy");
  const [buildingType, setBuildingType] = useState("apartment");
  const [selectedDistrict, setSelectedDistrict] = useState<string[]>([]);
  const [maxValue, setMaxValue] = useState(RANGE_MAX_VALUE);
  const [minValue, setMinValue] = useState(RANGE_MIN_VALUE);
  const [selectedProvidence, setselectedProvidence] = useState<number>(0);
  const router = useRouter();
  function handleSearch(moreFilter = false) {
    const searchPeram = new URLSearchParams("");
    searchPeram.set("category", category.toLocaleLowerCase());
    searchPeram.set("type", buildingType.toLocaleLowerCase());

    if (selectedButton.length) {
      searchPeram.set("bedrooms", String(selectedButton));
    } else {
      searchPeram.delete("bedrooms");
    }
    if (significant?.length) {
      searchPeram.set("significant", encodeURI(significant.join(",")));
    } else {
      searchPeram.delete("significant");
    }

    if (selectedDistrict?.length && selectedProvidence) {
      const districts1: string[] =
        //@ts-ignore
        providenceDistricList[lang][
          getProvidenceName(lang, selectedProvidence)
        ];

      const indexex = districts1
        .map((distric, i) => (selectedDistrict.includes(distric) ? i : null))
        .filter((item) => item !== null);
      const districts = indexex.map((item) => {
        //@ts-ignore
        return providenceDistricList.en[
          getProvidenceName("en", selectedProvidence)
        ][item];
      });

      searchPeram.set("city", encodeURI(districts.join(",")));
    } else {
      searchPeram.delete("city");
    }

    [
      { value: minValue, key: "mintotalAreas", limit: RANGE_MIN_VALUE },
      { value: maxValue, key: "maxtotalAreas", limit: RANGE_MAX_VALUE },
    ].forEach(({ value, key, limit }) => {
      if (value !== limit) {
        searchPeram.set(key, value.toString());
      } else {
        searchPeram.delete(key);
      }
    });

    if (moreFilter) {
      searchPeram.set("expand", "true");
    }

    router.push(`properties/?${searchPeram.toString()}`);
  }

  function handleTabChange(cb: Function, value: string) {
    cb(value);
    setSignificant([]);
    setSelectedButton([]);
    setSelectedDistrict([]);
    setMinValue(minValue);
    setMaxValue(maxValue);
  }

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  const tabContentStyle1 = `px-3 py-4 left-1/2 mx-auto w-full rounded-bl-[32px] rounded-br-[32px] lg:rounded-[32px] bg-[#CFCAD773] md:px-5 xl:px-9 xl:pt-8 xl:pb-[44px] md:py-3 backdrop-blur-[56px] md:relative md:-translate-x-1/2`;
  const tabsContainerClasses = ``;
  const commonClasses = `group rounded-none text-base font-semibold text-foreground focus:border-0 data-[state=active]:font-bold data-[state=active]:text-secondary md:text-xl  relative after:content-[''] after:h-1 lg:after:h-2 after:bg-secondary after:rounded-2xl after:absolute after:bottom-0 after:left-0 after:right-0 border-0 data-[state=active]:border-b-0 after:opacity-0 data-[state=active]:after:opacity-100 pt-1.5 pb-2 px-0 lg:px-5`;

  const tabListClasses = `flex flex-nowrap h-fit w-auto lg:w-full max-w-[calc(100%+12px)] lg:max-w-[calc(100%+140px)] overflow-x-auto overflow-y-hidden bg-transparent p-0 justify-start lg:justify-between rounded-none  max-lg:gap-4`;
  const tabContentClasses = `mt-9 grid w-full grid-cols-2 lg:grid-cols-3 justify-between gap-3 lg:flex`;

  const rangeFilterClasses = `mt-8 lg:mt-10 grid grid-cols-2 grid-rows-1 gap-3`;

  const filterOptionsClasses = `lg:mt-6 col-span-2 row-span-1 flex flex-col w-full lg:col-span-1 md:w-auto lg:relative`;
  const numberOfRoomsClassesWithApartment = `col-span-3 lg:md:col-span-1 2xl:basis-[38%]`;

  const buttonTriggerClasses =
    lang === "hy" ? "text-sm max-lg:px-2.5" : "text-base";

  return (
    <>
      <div className="relative w-full max-lg:px-3 max-lg:pt-3.5 lg:-mt-[16vh] xl:-mt-[21.9vh]">
        <div className="relative mx-auto w-full max-w-[980px]">
          <Tabs
            onValueChange={(value) => handleTabChange(setCategory, value)}
            defaultValue={category}
            className="w-full max-w-[980px]"
          >
            <TabsList className="relative mx-auto flex h-[52px] w-full items-start justify-between overflow-hidden rounded-none rounded-tl-[32px] rounded-tr-[32px] bg-[#CFCAD773] p-0.5 backdrop-blur-[56px] lg:h-16 lg:w-[80%] lg:rounded-full lg:p-0 xl:w-[76%]">
              <TabsTrigger value="buy" asChild className="rounded-full">
                <Button
                  className={`h-12 rounded-[32px] border-none bg-transparent text-sm text-dark data-[state=active]:bg-secondary data-[state=active]:text-light md:rounded-full lg:h-16 lg:min-w-[20%] lg:text-2xl ${buttonTriggerClasses}`}
                  variant={"outline"}
                  size={"lg"}
                >
                  {dict.buy}
                </Button>
              </TabsTrigger>
              <TabsTrigger value="rent" asChild className="rounded-full">
                <Button
                  className={`h-12 rounded-[32px] border-none bg-transparent text-base text-dark data-[state=active]:bg-secondary data-[state=active]:text-light md:min-w-[24%] md:rounded-full lg:h-16 lg:text-2xl ${buttonTriggerClasses}`}
                  variant={"outline"}
                  size={"lg"}
                >
                  {dict.rent}
                </Button>
              </TabsTrigger>
              <TabsTrigger value="daily rent" asChild className="rounded-full">
                <Button
                  className={`h-12 !w-fit rounded-[32px] border-none bg-transparent text-base text-dark hover:shadow-none data-[state=active]:bg-secondary data-[state=active]:text-light md:min-w-[26%] md:rounded-full lg:h-16 lg:text-2xl ${buttonTriggerClasses}`}
                  size={"lg"}
                  variant={"outline"}
                >
                  {dict.DailyRent}
                </Button>
              </TabsTrigger>
              <div className="absolute bottom-0 left-0.5 right-0.5 top-0.5 -z-1 rounded-[32px] bg-[#CFCAD773] lg:hidden"></div>
            </TabsList>
            <TabsContent value="buy" className="mt-0 w-full max-w-[980px]">
              <div className={tabContentStyle1}>
                <Tabs
                  defaultValue="apartment"
                  onValueChange={(value) =>
                    handleTabChange(setBuildingType, value)
                  }
                  className="bg-transparent"
                >
                  <TabsList className={`${tabListClasses}`}>
                    <TabsTrigger
                      value="apartment"
                      className={`${commonClasses}`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="hidden group-aria-selected:block">
                          {icons.activeApartment}
                        </span>
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.apartment}
                        </span>
                        &nbsp;{dict.apartment}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="house" className={`${commonClasses}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.house}
                        </span>
                        <span className="hidden group-aria-selected:block">
                          {icons.houseActive}
                        </span>
                        &nbsp;{dict.house}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="commercial"
                      className={`${commonClasses}`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.commercial}
                        </span>
                        <span className="hidden group-aria-selected:block">
                          {icons.commercialActive}
                        </span>
                        &nbsp;{dict.commercial}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="land" className={`${commonClasses}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="hidden group-aria-selected:block">
                          {icons.landActive}
                        </span>
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.land}
                        </span>
                        &nbsp;{dict.land}
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="apartment"
                    className={tabsContainerClasses}
                  >
                    {/* room */}
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div
                        className={
                          "col-span-3 lg:md:col-span-1 2xl:basis-[38%]"
                        }
                      >
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.numberOfRooms}
                        </h3>
                        <div className="grid grid-cols-1 items-center md:gap-8">
                          <RoomSelector
                            lang={lang}
                            {...{ selectedButton, setSelectedButton }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-2 row-span-1 hidden md:col-span-1 lg:block">
                        <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        />
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="house" className={tabsContainerClasses}>
                    {/* significant */}
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div className={numberOfRoomsClassesWithApartment}>
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.numberOfRooms}
                        </h3>
                        <div className="grid grid-cols-1 items-center md:gap-8">
                          <RoomSelector
                            lang={lang}
                            {...{ selectedButton, setSelectedButton }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        />
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="commercial"
                    className={tabsContainerClasses}
                  >
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div
                        className={`${numberOfRoomsClassesWithApartment} xl:basis-[30%]`}
                      >
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.significance}
                        </h3>

                        <div className="flex w-full items-center justify-center gap-2">
                          <SelectCheckBox
                            handleChange={(opt: string, i: number) => {
                              if (
                                significant.includes(
                                  CheckboxOption.commercial.en[i],
                                )
                              ) {
                                setSignificant(
                                  significant.filter(
                                    (optitem) =>
                                      optitem !==
                                      CheckboxOption.commercial.en[i],
                                  ),
                                );
                              } else {
                                setSignificant([
                                  ...significant,
                                  CheckboxOption.commercial.en[i],
                                ]);
                              }
                            }}
                            list={CheckboxOption.commercial[lang]}
                            isChecked={(opt: string, i: number) => {
                              return significant.includes(
                                CheckboxOption.commercial.en[i],
                              );
                            }}
                            placeholder={
                              !significant.length
                                ? dict.allTypes
                                : `${dict.selected} (${significant.length})`
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        {/* <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        /> */}
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="land" className={tabsContainerClasses}>
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div
                        className={`${numberOfRoomsClassesWithApartment} xl:basis-[30%]`}
                      >
                        <h2 className="mb-2 font-semibold lg:text-lg">
                          {dict.significance}
                        </h2>

                        <div className="flex w-full items-center justify-center gap-2">
                          <SelectCheckBox
                            handleChange={(opt: string, i: number) => {
                              if (
                                significant.includes(CheckboxOption.land.en[i])
                              ) {
                                setSignificant(
                                  significant.filter(
                                    (optitem) =>
                                      optitem !== CheckboxOption.land.en[i],
                                  ),
                                );
                              } else {
                                setSignificant([
                                  ...significant,
                                  CheckboxOption.land.en[i],
                                ]);
                              }
                            }}
                            list={CheckboxOption.land[lang]}
                            isChecked={(opt: string, i: number) => {
                              return significant.includes(
                                CheckboxOption.land.en[i],
                              );
                            }}
                            placeholder={
                              !significant.length
                                ? dict.allTypes
                                : `${dict.selected} (${significant.length})`
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        {/* <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        /> */}
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            <TabsContent value="rent" className="mt-0 w-full max-w-[980px]">
              <div className={tabContentStyle1}>
                <Tabs
                  onValueChange={(value) =>
                    handleTabChange(setBuildingType, value)
                  }
                  defaultValue="apartment"
                  className="bg-transparent"
                >
                  <TabsList className={`${tabListClasses}`}>
                    <TabsTrigger
                      value="apartment"
                      className={`${commonClasses}`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="hidden group-aria-selected:block">
                          {icons.activeApartment}
                        </span>
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.apartment}
                        </span>
                        &nbsp;{dict.apartment}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="house" className={`${commonClasses}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.house}
                        </span>
                        <span className="hidden group-aria-selected:block">
                          {icons.houseActive}
                        </span>
                        &nbsp;{dict.house}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="commercial"
                      className={`${commonClasses}`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.commercial}
                        </span>
                        <span className="hidden group-aria-selected:block">
                          {icons.commercialActive}
                        </span>
                        &nbsp;{dict.commercial}
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="apartment"
                    className={tabsContainerClasses}
                  >
                    {/* room */}
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div className={numberOfRoomsClassesWithApartment}>
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.numberOfRooms}
                        </h3>
                        <div className="grid grid-cols-1 items-center md:gap-8">
                          <RoomSelector
                            lang={lang}
                            {...{ selectedButton, setSelectedButton }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        />
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="house" className={tabsContainerClasses}>
                    {/* significant */}
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div className={numberOfRoomsClassesWithApartment}>
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.numberOfRooms}
                        </h3>
                        <div className="grid grid-cols-1 items-center md:gap-8">
                          <RoomSelector
                            lang={lang}
                            {...{ selectedButton, setSelectedButton }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        />
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="commercial"
                    className={tabsContainerClasses}
                  >
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div
                        className={`${numberOfRoomsClassesWithApartment} xl:basis-[30%]`}
                      >
                        <h2 className="mb-2 font-semibold lg:text-lg">
                          {dict.significance}
                        </h2>

                        <div className="flex w-full items-center justify-center gap-2">
                          <SelectCheckBox
                            handleChange={(opt: string, i: number) => {
                              if (
                                significant.includes(
                                  CheckboxOption.commercial.en[i],
                                )
                              ) {
                                setSignificant(
                                  significant.filter(
                                    (optitem) =>
                                      optitem !==
                                      CheckboxOption.commercial.en[i],
                                  ),
                                );
                              } else {
                                setSignificant([
                                  ...significant,
                                  CheckboxOption.commercial.en[i],
                                ]);
                              }
                            }}
                            list={CheckboxOption.commercial[lang]}
                            isChecked={(opt: string, i: number) => {
                              return significant.includes(
                                CheckboxOption.commercial.en[i],
                              );
                            }}
                            placeholder={
                              !significant.length
                                ? dict.allTypes
                                : `${dict.selected} (${significant.length})`
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        {/* <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        /> */}
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            <TabsContent
              value="daily rent"
              className="mt-0 w-full max-w-[980px]"
            >
              <div className={tabContentStyle1}>
                <Tabs
                  onValueChange={(value) =>
                    handleTabChange(setBuildingType, value)
                  }
                  defaultValue="apartment"
                  className="bg-transparent"
                >
                  <TabsList
                    className={`${cn(tabListClasses, "lg:justify-start lg:gap-12")}`}
                  >
                    <TabsTrigger
                      value="apartment"
                      className={`${commonClasses}`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="hidden group-aria-selected:block">
                          {icons.activeApartment}
                        </span>
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.apartment}
                        </span>
                        &nbsp;{dict.apartment}
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="house" className={`${commonClasses}`}>
                      <div className="flex items-center justify-center gap-0.5">
                        <span className="hidden group-aria-selected:block">
                          {icons.houseActive}
                        </span>
                        <span className="custom-small-logo group-aria-selected:hidden">
                          {icons.house}
                        </span>
                        &nbsp;{dict.house}
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="apartment"
                    className={tabsContainerClasses}
                  >
                    {/* room */}
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div className={numberOfRoomsClassesWithApartment}>
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.numberOfRooms}
                        </h3>
                        <div className="grid grid-cols-1 items-center md:gap-8">
                          <RoomSelector
                            lang={lang}
                            {...{ selectedButton, setSelectedButton }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        />
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="house" className={tabsContainerClasses}>
                    {/* significant */}
                    <div className={`${tabContentClasses}`}>
                      <Locationselector
                        {...{
                          selectedDistrict,
                          setSelectedDistrict,
                          selectedProvidence,
                          setselectedProvidence,
                          dict,
                        }}
                      />

                      <div className={numberOfRoomsClassesWithApartment}>
                        <h3 className="mb-2 font-semibold lg:text-lg">
                          {dict.numberOfRooms}
                        </h3>
                        <div className="grid grid-cols-1 items-center md:gap-8">
                          <RoomSelector
                            lang={lang}
                            {...{ selectedButton, setSelectedButton }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${rangeFilterClasses}`}>
                      <div className="col-span-1 row-span-1 hidden lg:block">
                        <RangeFilterHome
                          title={dict.sqMiterRange}
                          {...{
                            minValue,
                            maxValue,
                            setMinValue,
                            setMaxValue,
                            step: RANGE_STEP,
                            min: RANGE_MIN,
                          }}
                        />
                      </div>
                      <div className={`${filterOptionsClasses}`}>
                        <div className="flex w-full lg:space-x-3">
                          <FilterOptions
                            onSearch={handleSearch}
                            moreFilter={dict.moreFilters}
                            search={dict.search}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <FilterSide
        className="fixed bottom-10 right-0 z-50 flex translate-x-0 transform cursor-pointer items-center transition-transform md:hidden"
        onClick={(e) => {
          e.stopPropagation();
          handleSearch(true);
        }}
      />
    </>
  );
}
