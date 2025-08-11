// @ts-nocheck
import { langType } from "@/app/[lang]/(main)/page";
import { showToast } from "@/components/common/toaster/toaster";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyForm } from "@/lib/db/type";
import { providenceDistricList } from "@/utils/Areas";
import { Prettify } from "@/utils/convertCurrency";
import { Map, Placemark, YMaps } from "@r3flector/react-yandex-maps";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { allDistricts } from "../forms/_schema/generatePropertySchema";
import { getGeoInfo, getPlacesSuggestion } from "./action";
import { InputGroup } from "./InputGroup";
import { GeoResponse, SuggestResponse } from "./MapResponseType";
//@ts-ignore
export const langDB = {
  en: "en_US",
  rus: "ru_RU",
  hy: "hy_AM",
} as const;
export default function YandexMap({
  form,
  dict,
}: {
  form: any;
  type: string;
  dict: PropertyForm;
  defaultValue?: any;
  onLocation?: any;
}) {
  const [error, setError] = useState("");
  const [mapCenter, setMapCenter] = useState([44.530746, 40.205137]);
  const { latitude, longitude } = form.watch("location") || {};

  const [zoom] = useState(13);
  const [Bsuggestions, setSuggestions] = useState<any>([]);
  const [isPending, startTransition] = useTransition();
  const { lang }: { lang: Prettify<langType> } = useParams();
  const debounceFetchSuggestions = useRef<any>(null);
  const suggestions =
    Bsuggestions?.find((item: any) => item.lang === lang)?.data || ([] as any);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    form.setValue(`location.address.${lang}`, value);

    if (debounceFetchSuggestions.current) {
      debounceFetchSuggestions.current(value);
    }
  }

  const fetchSuggestionsFromServer = useCallback(
    async (value: string) => {
      startTransition(async () => {
        try {
          setError("");
          const apiData = (await getPlacesSuggestion(value, false)) as {
            lang: langType;
            data: SuggestResponse;
          }[];

          const data = apiData?.find((item) => item.lang === lang)?.data;
          if (!data) return;

          //update others field
          Object.keys(langDB)
            .filter((langItem) => langItem !== lang)
            .map((langCode) => {
              const typedSuggestionList =
                apiData?.find((item: any) => item.lang === langCode)?.data ||
                ([] as any).map((suggest) => suggest.title.text);
              if (typedSuggestionList?.length) {
                form.setValue(
                  `location.address.${langCode}`,
                  typedSuggestionList[0]?.title?.text || value,
                );
              }
            });
          setSuggestions(apiData);
        } catch (error) {
          //@ts-ignore
          setError(`Error ${error.message}`);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );

  useEffect(() => {
    debounceFetchSuggestions.current = debounce((value: string) => {
      if (value) {
        fetchSuggestionsFromServer(value);
      } else {
        setSuggestions([]);
      }
    }, 1000);
    return () => {
      debounceFetchSuggestions.current.cancel();
    };
  }, [fetchSuggestionsFromServer]);

  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter([Number(longitude), Number(latitude)]);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        });
      }
    }
  }, [latitude, longitude]);

  async function handleSelect(
    options: {} & (
      | {
          cordMode: true;
          cords: [number, number];
        }
      | {
          cordMode: false;
          address: string;
        }
    ),
  ) {
    try {
      setError("");
      const apiRes = (await getGeoInfo(options)) as {
        lang: string;
        data: GeoResponse;
      }[];

      const response = apiRes?.find((item) => item.lang === lang)?.data as any;

      if (!response) return;

      if (response?.statusCode === 403) {
        return showToast({
          message: response?.message,
          type: "error",
          title: dict.Error,
        });
      }

      if (
        !options.cordMode &&
        response.response?.GeoObjectCollection?.featureMember?.length > 0
      ) {
        const [Longitude, Latitude] =
          response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
            " ",
          );

        form.setValue("location.latitude", Longitude);
        form.setValue("location.longitude", Latitude);
      }
      if (options.cordMode) {
        Object.keys(langDB).map((langItem) => {
          form.setValue(
            `location.address.${langItem}`,
            getStreet(apiRes?.find((item) => item.lang === langItem)?.data) ||
              getStreet(apiRes?.find((item) => item.lang === "en")?.data),
          );
        });

        form.setValue("location.latitude", options.cords[1]);
        form.setValue("location.longitude", options.cords[0]);
      } else {
        Object.keys(langDB)
          .filter((langCode) => langCode != lang)
          .map((langItem) => {
            form.setValue(
              `location.address.${langItem}`,
              getStreet(apiRes?.find((item) => item.lang === langItem)?.data) ||
                getStreet(apiRes?.find((item) => item.lang === "en")?.data),
            );
          });
      }
  
      
    } catch (error) {
      //@ts-ignore
      setError(`Error :- ${error?.message}`);
    }
  }

  async function handleSuggestionSelect(ibdex: number) {
    const value = suggestions[ibdex];
    Object.keys(langDB).map((langItem) => {
      form.setValue(
        `location.address.${langItem}`,
        Bsuggestions?.find((it: any) => it.lang === langItem)?.data[ibdex]
          ?.title?.text || value.title.text,
      );
    });

    handleSelect({
      cordMode: false,
      address: value.title.text,
    });

    setSuggestions([]);
  }
  function getStreet(response: GeoResponse | undefined) {
    if (!response) {
      return undefined;
    }
    return (
      response.response.GeoObjectCollection.featureMember[0].GeoObject
        .metaDataProperty.GeocoderMetaData.Address.formatted ||
      response.response.GeoObjectCollection.featureMember[0].GeoObject
        .metaDataProperty.GeocoderMetaData.text ||
      response.response.GeoObjectCollection.featureMember[0].GeoObject.name
    );
  }

  const stateList = Object.keys(providenceDistricList[lang]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const provinceKeys = Object.keys(
    providenceDistricList[lang as keyof typeof providenceDistricList],
  );
  let finalCityList: string[] = [];
  if (selectedProvince >= 0 && selectedProvince < provinceKeys.length) {
    const selectedProvinceName = provinceKeys[
      selectedProvince
    ] as keyof (typeof providenceDistricList)[typeof lang];
    finalCityList =
      providenceDistricList[lang as keyof typeof providenceDistricList][
        selectedProvinceName
      ];
  }
  const [isDropdownVisible, setDropdownVisible] = useState<
    "Province" | "District" | ""
  >("");

  const city = form.watch("location.city");
  useEffect(() => {
    if (allDistricts.includes(city)) {
      form.clearErrors("location.city");
    }
  }, [city, form]);

  return (
    <div>
      <div className="relative mb-4">
        <FormField
          control={form.control}
          name={`location.address.${lang}`}
          render={({ field }) => (
            <FormItem>
              <FormControl className="pr-20">
                <Input
                  {...field}
                  autoComplete="off"
                  id="suggest-input"
                  onChange={handleInputChange}
                  placeholder={dict.ProvinceStateCity}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DropDown will appear after the input */}
        {suggestions.length > 0 && (
          <DropDown
            title={dict.Address}
            isPending={isPending}
            suggestions={suggestions.map((suggest) => suggest.title.text)}
            onSelect={handleSuggestionSelect}
          />
        )}
      </div>
      <span className="text-xs text-red-700">{error}</span>

      <div className="mt-4 h-64">
        <YMaps
          query={{
            suggest_apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_API!,
            lang: langDB[lang],
            apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_GEOCODER_API!,
          }}
        >
          <Map
            defaultOptions={{
              suppressObsoleteBrowserNotifier: true,
            }}
            onClick={(e: any) => {
              const [longitutte, latitude] = e.get("coords");
              setMapCenter([longitutte, latitude]);

              handleSelect({
                cordMode: true,
                cords: [longitutte, latitude],
              });
            }}
            className="h-full w-full"
            state={{ center: mapCenter, zoom: zoom }}
          >
            <Placemark geometry={mapCenter} />
          </Map>
        </YMaps>
      </div>
      <div className="mt-4 flex gap-6">
        <div className="relative mb-4">
          <FormField
            control={form.control}
            name={`location.state`}
            render={({ field }) => (
              <FormItem>
                <FormControl className="pr-20">
                  <Input
                    {...field}
                    placeholder={dict.Province}
                    autoComplete="off"
                    onFocus={() => setDropdownVisible("Province")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isDropdownVisible === "Province" && (
            <DropDown
              onSelect={(i: number, value: any) => {
                const getIndex = stateList.findIndex((item) => item === value);
                if (getIndex !== -1) {
                  Object.keys(langDB).map((langCode) => {
                    form.setValue(
                      `location.tState.${langCode}`,
                      Object.keys(
                        providenceDistricList[
                          langCode as keyof typeof providenceDistricList
                        ],
                      )[getIndex],
                    );
                  });
                  form.setValue(
                    `location.state`,
                    Object.keys(providenceDistricList[lang])[getIndex],
                  );
                  setSelectedProvince(getIndex);
                }
              }}
              suggestions={stateList.filter((item) => {
                return form.watch(`location.state`)
                  ? item.toLowerCase().includes(form.watch(`location.state`))
                  : true;
              })}
              title={dict.Province}
            />
          )}
        </div>
        <div className="relative mb-4">
          <FormField
            control={form.control}
            name={`location.city`}
            render={({ field }) => (
              <FormItem>
                <FormControl className="pr-20">
                  <Input
                    {...field}
                    placeholder={dict.District}
                    autoComplete="off"
                    onFocus={() => setDropdownVisible("District")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isDropdownVisible === "District" && (
            <DropDown
              onSelect={(i: number, value: any) => {
                Object.keys(langDB).forEach((langCodeItem) => {
                  const findCity =
                    providenceDistricList[langCodeItem][
                      Object.keys(providenceDistricList[langCodeItem])[
                        selectedProvince
                      ]
                    ][i];
                  form.setValue(`location.tCity.${langCodeItem}`, findCity);
                });
                form.setValue("location.city", value);
              }}
              suggestions={finalCityList.filter((item) => {
                return form.watch(`location.city`)
                  ? item.toLowerCase().includes(form.watch(`location.state`))
                  : true;
              })}
              title={dict.District}
            />
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-3">
          <Label className="flex gap-4">
            <span>{dict.Title}</span>
          </Label>
        </div>
        <FormField
          control={form.control}
          name="title.hy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder={dict.AddArmtitle} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6">
          <FormField
            control={form.control}
            name="title.en"
            render={({ field }) => (
              <FormItem>
                <FormControl className="pr-20">
                  <InputGroup
                    field={field}
                    placeholder={dict.AddEnTitle}
                    label={dict.WriteEnTitle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <FormField
            control={form.control}
            name="title.rus"
            render={({ field }) => (
              <FormItem>
                <FormControl className="pr-20">
                  <InputGroup
                    // disabled={!rewriteTitle}
                    field={field}
                    placeholder={dict.WriteRusTitle}
                    label={dict.WriteRusTitle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

// DropDown Component
export function DropDown({
  suggestions,
  onSelect,
  title,
  isPending = false,
}: {
  isPending?: boolean;
  title: string;
  suggestions: string[];
  onSelect?: Function;
}) {
  return (
    <ul
      className="mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-300 bg-white"
      onMouseDown={(e) => e.preventDefault()}
    >
      {isPending ||
        (suggestions.length > 0 && (
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
            Select {title}
          </li>
        ))}

      {isPending ? (
        <>
          <li className="animate-pulse cursor-pointer bg-slate-300 px-4 py-2 hover:bg-gray-100"></li>
          <li className="animate-pulse cursor-pointer bg-slate-300 px-4 py-2 hover:bg-gray-100"></li>
          <li className="animate-pulse cursor-pointer bg-slate-300 px-4 py-2 hover:bg-gray-100"></li>
          <li className="animate-pulse cursor-pointer bg-slate-300 px-4 py-2 hover:bg-gray-100"></li>
        </>
      ) : (
        suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect?.(index, suggestion);
            }}
          >
            {suggestion}
          </li>
        ))
      )}
    </ul>
  );
}
