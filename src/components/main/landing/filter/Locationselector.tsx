"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { Hero } from "@/lib/db/type";
import {
  getProvidenceName,
  providenceDistricList,
  ProvidenceType,
} from "@/utils/Areas";
import { useParams } from "next/navigation";
import SelectCheckBox from "./SelectCheckBox";

export default function Locationselector({
  selectedDistrict,
  setSelectedDistrict,
  selectedProvidence,
  setselectedProvidence,
  dict,
}: {
  selectedDistrict: string[];
  setSelectedDistrict: Function;
  selectedProvidence: number;
  setselectedProvidence: Function;
  dict: Hero;
}) {
  const { lang }: { lang: langType } = useParams();
  const providencList = Object?.keys(providenceDistricList[lang]);
  const distinctList: string[] =
    selectedProvidence >= 0
      ? //@ts-ignore
        providenceDistricList[lang][getProvidenceName(lang, selectedProvidence)]
      : [];

  return (
    <div className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:gap-10">
      <div className="max-lg:w-1/2">
        <h3 className="mb-2 font-semibold lg:text-lg">{dict.province}</h3>

        <div className="flex w-full items-center justify-center gap-2 lg:w-[150px]">
          <SelectCheckBox
            handleChange={(opt: ProvidenceType, i: number) => {
              setSelectedDistrict([]);

              if (i === selectedProvidence) {
                setselectedProvidence(-1);
              } else {
                setselectedProvidence(i);
              }
            }}
            list={providencList}
            isChecked={(_opt: string, i: number) => {
              return selectedProvidence === i;
            }}
            placeholder={
              selectedProvidence > 0
                ? getProvidenceName(lang, selectedProvidence)
                : dict.province
            }
          />
        </div>
      </div>
      <div className="max-lg:w-1/2">
        <h3 className="mb-2 font-semibold lg:text-lg">{dict.distric}</h3>

        <div className="flex w-full items-center justify-center gap-2 lg:w-[253px]">
          <SelectCheckBox
            handleChange={(opt: string) => {
              if (selectedDistrict.includes(opt)) {
                setSelectedDistrict(
                  selectedDistrict.filter((optitem) => optitem !== opt),
                );
              } else {
                setSelectedDistrict([...selectedDistrict, opt]);
              }
            }}
            list={distinctList}
            isChecked={(opt: string) => {
              return selectedDistrict.includes(opt);
            }}
            placeholder={
              !selectedDistrict.length
                ? dict.distric
                : `${dict.selected} (${selectedDistrict.slice(0, 2)} ${selectedDistrict.length > 2 ? "..." : ""})`
            }
          />
        </div>
      </div>
    </div>
  );
}
