import { langType } from "@/app/[lang]/(main)/page";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { providenceDistricList } from "@/utils/Areas";
import { Label } from "@radix-ui/react-label";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
type PropType = {
  province: string;
  district: string;
};
function ProvidenceFilterComp({ province, district }: PropType) {
  const { lang } = useParams<{ lang: langType }>(); // Type useParams correctly
  const [providenceIndex, setProvidenceIndex] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingCity = searchParams.get("city");

  const cityList = useMemo<string[]>(() => {
    return existingCity ? decodeURIComponent(existingCity).split(",") : [];
  }, [existingCity]);

  const providenceList = useMemo<string[]>(() => {
    return Object.keys(providenceDistricList.en);
  }, []);

  const districts: string[] =
    providenceIndex >= 0
      ? providenceDistricList[lang][getProvidenceName(providenceIndex)]
      : [];

  useEffect(() => {
    if (cityList.length) {
      for (let index = 0; index < providenceList.length; index++) {
        const district = providenceDistricList.en[providenceList[index]];
        if (district.includes(cityList[0])) {
          setProvidenceIndex(index);
          break;
        }
      }
    }
  }, [cityList, providenceList]);

  function isDistrict(districIndex: number): boolean {
    const cityName = getEnCityName(districIndex);
    return cityList.includes(cityName);
  }

  function getEnCityName(districIndex: number): string {
    return providenceDistricList.en[providenceList[providenceIndex]][
      districIndex
    ];
  }

  function getProvidenceName(providencIndex: number): string {
    return Object.keys(providenceDistricList[lang])[providencIndex];
  }

  return (
    <AccordionItem
      value="item-3"
      className="mt-8 border-none"
      aria-expanded={true}
    >
      <AccordionTrigger>
        <h2 className="text-lg font-semibold">{province}</h2>
        {districts.length > 0 && (
          <h2 className="text-lg font-semibold">{district}</h2>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex gap-4">
          <div className="space-y-4">
            {providenceList.map((value, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox
                  className="bg-white"
                  id={value}
                  value={value.toLowerCase()}
                  checked={providenceIndex === i}
                  onCheckedChange={() => {
                    if (providenceIndex === i) {
                      setProvidenceIndex(-1);
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.delete("city");
                      router.replace(`/properties?${params.toString()}`, {
                        scroll: false,
                      });
                    } else {
                      setProvidenceIndex(i);
                    }
                  }}
                />
                <Label htmlFor={value}>{getProvidenceName(i)}</Label>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              {districts.map((value, i) => (
                <div key={value} className="flex items-center gap-2">
                  <Checkbox
                    className="bg-white"
                    id={value}
                    value={value.toLowerCase()}
                    checked={isDistrict(i)}
                    onCheckedChange={(checked) => {
                      const newCityList = checked
                        ? [...cityList, getEnCityName(i)]
                        : cityList.filter((city) => city !== getEnCityName(i));

                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );

                      if (newCityList.length > 0) {
                        const queryString = newCityList.join(",");
                        params.set("city", encodeURI(queryString));
                      } else {
                        params.delete("city");
                      }
                      router.replace(`/properties?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
                  />
                  <Label htmlFor={value}>{value}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function ProvidenceFilter({ district, province }: PropType) {
  return (
    <Suspense>
      <ProvidenceFilterComp {...{ district, province }} />
    </Suspense>
  );
}
