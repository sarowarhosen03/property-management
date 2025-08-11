"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { projectType as ProjectType } from "@/components/dashboard/forms/_components/HouseForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LightBox from "../lightbox/LightBox";

const BuildingTypes = {
  en: {
    "New construction": "New construction",
    "Stone building": "Stone building",
  },
  hy: {
    "New construction": "Նոր կառուցվածք",
    "Stone building": "Քարե շենք",
  },
  rus: {
    "New construction": "Новостройка",
    "Stone building": "Кирпичное здание",
  },
};

export default function ProductDetailsGallery({
  propertyImages,
  lang,
  buildingType,
  dict,
  title,
  projectType,
}: {
  projectType: string[];
  title: {
    en: string;
    hy: string;
    rus: string;
  };
  propertyImages: string[];
  lang: langType;
  buildingType: string;
  dict: string;
}) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleLightBoxImage = (index: number) => {
    setImageIndex(index);
    setLightBoxOpen(true);
  };

  let styleConfig = {
    firstImage: { colspan: 2, rowSpan: 2 },
    others: { colspan: 1, rowSpan: 1 },
  };

  if (propertyImages.length === 1) {
    styleConfig.firstImage = { colspan: 4, rowSpan: 2 };
  } else if (propertyImages.length === 2) {
    styleConfig.others = { colspan: 2, rowSpan: 2 };
  } else if (propertyImages.length === 3) {
    styleConfig.others = { colspan: 2, rowSpan: 1 };
  }
  let building_type =
    buildingType === "New construction"
      ? BuildingTypes[lang]["New construction"]
      : BuildingTypes[lang]["Stone building"];

  return (
    <>
      <LightBox
        images={propertyImages.map((src) => ({ src }))}
        onController={setLightBoxOpen}
        index={imageIndex}
        open={lightBoxOpen}
      />

      <div>
        <div className="grid max-h-[32rem] grid-cols-4 grid-rows-2 items-center gap-4 overflow-hidden rounded-3xl">
          {propertyImages.slice(0, 5).map((img, i) => (
            <div
              key={i}
              className={`relative flex h-full w-full col-span-${i === 0 ? styleConfig.firstImage.colspan : propertyImages.length === 4 && i === 3 ? 2 : styleConfig.others.colspan} row-span-${i === 0 ? styleConfig.firstImage.rowSpan : styleConfig.others.rowSpan}`}
            >
              <Image
                onClick={() => handleLightBoxImage(i)}
                width={700}
                height={500}
                src={img}
                alt={title?.[lang] || title.en}
                className={`h-auto w-full bg-[#9f9aa6] object-cover`}
                quality={100}
              />
              {i === 0 && (
                <div className="absolute left-6 top-6 flex gap-2">
                  {projectType?.includes("investment") && (
                    <Button
                      variant={"normal"}
                      size={"sm"}
                      className="w-8 bg-success p-0"
                    >
                      <Link href={`/investment`}>
                        <Image
                          src={"/svgs/coins-percent-arrow-up.svg"}
                          width={24}
                          height={24}
                          alt="heart"
                          className="h-6 w-6"
                        />
                      </Link>
                    </Button>
                  )}

                  {projectType
                    .filter((i) => i !== "investment")
                    .map((item) => (
                      <Button
                        key={item}
                        variant={"normal"}
                        size={"sm"}
                        className="bg-gradient-to-r from-[#AB99C4] to-[#635577] font-semibold capitalize text-white"
                      >
                        {ProjectType[lang].find((i) => i.value === item)?.label}
                      </Button>
                    ))}
                </div>
              )}
              {i === 4 && (
                <Button
                  onClick={() => handleLightBoxImage(i)}
                  className="absolute bottom-6 right-6"
                  variant={"secondary"}
                  size={"sm"}
                >
                  {dict}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
