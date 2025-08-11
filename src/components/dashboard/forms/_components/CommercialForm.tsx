"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { langType } from "@/app/[lang]/(main)/page";
import { getFeatureList } from "@/components/common/single-product/_components/FeatureList";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyForm } from "@/lib/db/type";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import { currencyList } from "@/utils/convertCurrency";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import CheckboxGroup from "../../inputs/CheckboxGroup";
import { RadioGroup } from "../../inputs/RadioGroup";
import { TextareaGroup } from "../../inputs/TextareaGroup";
import YandexMap from "../../inputs/YandexMap";
import IsBestOffer from "./IsBestOffer";

const constructionOptions = {
  en: [
    { value: "panel", label: "Panels" },
    { value: "stone", label: "Stone" },
    { value: "new construction", label: "New Construction" },
  ],
  hy: [
    { value: "panel", label: "Պանելային" },
    { value: "stone", label: "Քարե" },
    { value: "new construction", label: "Նորակառույց" },
  ],
  rus: [
    { value: "panel", label: "Панели" },
    { value: "stone", label: "Камень" },
    { value: "new construction", label: "Новое строительство" },
  ],
};

const renovationOptions = {
  en: [
    { value: "no renovation", label: "No Renovation" },
    { value: "needs renovation", label: "Needs Renovation" },
    { value: "cosmetic renovation", label: "Cosmetic Renovation" },
    { value: "major renovation", label: "Major Renovation" },
    { value: "designer renovation", label: "Designer Renovation" },
  ],
  hy: [
    { value: "no renovation", label: "Առանց վերանորոգման" },
    { value: "needs renovation", label: "Վերանորոգման կարիք ունի" },
    { value: "cosmetic renovation", label: "Կոսմետիկ վերանորոգում" },
    { value: "major renovation", label: "Կապիտալ վերանորոգում" },
    { value: "designer renovation", label: "Դիզայներական վերանորոգում" },
  ],
  rus: [
    { value: "no renovation", label: "Без ремонта" },
    { value: "needs renovation", label: "Требуется ремонт" },
    { value: "cosmetic renovation", label: "Косметический ремонт" },
    { value: "major renovation", label: "Капитальный ремонт" },
    { value: "designer renovation", label: "Дизайнерский ремонт" },
  ],
};

const significanceOptions = {
  en: [
    { value: "office space", label: "Office space" },
    { value: "service area", label: "Service Area" },
    { value: "trade area", label: "Trade Area" },
    { value: "workshop", label: "Workshop" },
    { value: "warehouse", label: "Warehouse" },
    { value: "building/construction", label: "Building/Construction" },
    { value: "universal area", label: "Universal Area" },
    { value: "hotel", label: "Hotel" },
  ],
  hy: [
    { value: "office space", label: "Օֆիսային տարածք" },
    { value: "service area", label: "Սպասարկման տարածք" },
    { value: "trade area", label: "Առևտրի տարածք" },
    { value: "workshop", label: "Արտադրամաս" },
    { value: "warehouse", label: "Պահեստ" },
    { value: "building/construction", label: "Շենք/շինություն" },
    { value: "universal area", label: "Ունիվերսալ տարածք" },
    { value: "hotel", label: "Հյուրանոց" },
  ],
  rus: [
    { value: "office space", label: "Офисное помещение" },
    { value: "service area", label: "Сервисная зона" },
    { value: "trade area", label: "Торговая зона" },
    { value: "workshop", label: "Мастерская" },
    { value: "warehouse", label: "Склад" },
    { value: "building/construction", label: "Здание/Строительство" },
    { value: "universal area", label: "Универсальная зона" },
    { value: "hotel", label: "Гостиница" },
  ],
};

const bathroomsOptions = {
  en: [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ],
  hy: [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ],
  rus: [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ],
};

const projectType = {
  en: [
    // { value: "investment", label: "Investment" },
    { value: "new construction", label: "New construction" },
    { value: "by Developer", label: "By Developer" },
    { value: "investment", label: "Investment" },
  ],
  hy: [
    // { value: "investment", label: "Ներդրումային" },
    { value: "new construction", label: "Նորակառույց" },
    { value: "by Developer", label: "Շինարարից" },
    { value: "investment", label: "Ներդրումային" },
  ],
  rus: [
    // { value: "investment", label: "Инвестиции" },
    { value: "new construction", label: "Новое строительство" },
    { value: "by Developer", label: "От застройщика" },
    { value: "investment", label: "Инвестиции" },
  ],
};

export default function CommercialForm({
  category,
  lang,
  form,
  onLocation,
  type,
  defaultData,
  dict,
}: {
  dict: PropertyForm;
  lang: langType;
  category: string;
  form: UseFormReturn<any>;
  type: string;
  onLocation?: any;
  defaultData?: any;
}) {
  const features = getFeatureList(type.toLocaleLowerCase(), lang);
  const utilities = features.Utilities.map(
    (feature: { name: string; label: string }) => ({
      value: feature.name,
      label: feature.label,
    }),
  );
  const additional = features.Additional.map(
    (feature: { name: string; label: string }) => ({
      value: feature.name,
      label: feature.label,
    }),
  );
  const { setIsContractBased: storeSetIsContractBased } = useStore();
  const [isContractBased, setIsContractBased] = useState<boolean>(false);

  useEffect(() => {
    storeSetIsContractBased(isContractBased);
  }, [isContractBased, storeSetIsContractBased]);
  const contractValues = form.getValues("isContractBased");
  useEffect(() => {
    setIsContractBased(contractValues);
  }, [contractValues]);

  return (
    <>
      {/* {category === "buy" && ( */}
      <FormField
        control={form.control}
        name="projectType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CheckboxGroup
                field={field}
                options={projectType[lang]}
                className="gap-6"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* )} */}
      <div className="my-5 grid grid-cols-2 gap-x-6">
        <div className="col grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">
              {dict["Building type"]}
            </h3>

            <FormField
              control={form.control}
              name="buildingType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      field={field}
                      options={constructionOptions[lang]}
                      className="flex h-auto flex-col items-start gap-y-4"
                      variant="rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">
              {dict.numberOfBathroom}
            </h3>

            <FormField
              control={form.control}
              name="details.bathrooms"
              defaultValue={"1"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      field={field}
                      variant="rounded"
                      options={bathroomsOptions[lang]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      <div className="my-5 flex flex-col">
        <h3 className="mb-4 text-lg font-semibold">{dict["Significance"]}</h3>
        <FormField
          control={form.control}
          name="significance"
          defaultValue={[]}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CheckboxGroup
                  field={field}
                  options={significanceOptions[lang]}
                  className="block h-auto columns-3 items-start"
                  labelClasses="mb-4 flex"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">{dict.Renovation}</h3>

            <FormField
              control={form.control}
              name="renovation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      field={field}
                      options={renovationOptions[lang]}
                      className="flex h-auto flex-col items-start gap-y-4"
                      variant="rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="col">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">{dict.Utilities}</h3>

            <FormField
              control={form.control}
              name="details.utilities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckboxGroup
                      field={field}
                      options={utilities}
                      className="flex h-auto flex-col items-start gap-y-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="col col-span-2">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">{dict.Additional}</h3>

            <FormField
              control={form.control}
              name="details.additionalUtilities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CheckboxGroup
                      field={field}
                      options={additional}
                      className="block h-auto columns-3 items-start"
                      labelClasses="mb-4 flex"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <FormField
          control={form.control}
          name="isContractBased"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
              <FormLabel className="cursor-pointer text-sm font-medium">
                {dict.isContractBased}
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="my-5 grid grid-cols-4 gap-6">
        <div className="flex flex-col">
          <h3
            className={`${cn(
              "mb-2 text-lg font-semibold",
              isContractBased && "opacity-50",
            )}`}
          >
            {category === "rent" ? dict.monthlyFee : dict.price}
          </h3>
          <div className="relative mx-auto w-full max-w-md">
            <FormField
              control={form.control}
              name="price.amount"
              render={({ field }) => (
                <FormItem>
                  <div className="flex overflow-hidden rounded-md border border-input">
                    <FormControl className="flex-grow">
                      <Input
                        type="text"
                        {...field}
                        disabled={isContractBased!}
                        placeholder={dict.enterPrice}
                        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="price.currency"
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultValue={currencyList[0].code}
                          onValueChange={field.onChange}
                          disabled={isContractBased!}
                        >
                          <SelectTrigger className="w-[80px] border-none focus:ring-0">
                            <SelectValue placeholder={currencyList[0].code} />
                          </SelectTrigger>
                          <SelectContent>
                            {currencyList.map((i) => (
                              <SelectItem key={i.code} value={i.code}>
                                {i.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">{dict.ID}</h3>
          <div className="relative">
            <FormField
              control={form.control}
              name="_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="pr-20">
                    <Input
                      type="text"
                      {...field}
                      placeholder={dict.generateCustomId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {type === "commercial" && category !== "rent" && (
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">
              {dict["Land surface"]}
            </h3>
            <div className="relative">
              <FormField
                control={form.control}
                name="details.totalAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="pr-20">
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute right-0 top-0 flex w-12 items-center px-3 py-2">
                {dict.mSquare}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">
            {dict.HouseArea} {`(${dict.sqM})`}
          </h3>
          <div className="relative">
            <FormField
              control={form.control}
              name="details.area"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="pr-20">
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="absolute right-0 top-0 flex w-12 items-center px-3 py-2">
              {dict.mSquare}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <h3 className="mb-2 text-lg font-semibold">{dict.Address}</h3>

          <YandexMap
            form={form}
            onLocation={onLocation}
            type={type}
            defaultValue={defaultData}
            dict={dict}
          />

          <div className="mt-8 flex flex-col">
            <h3 className="mb-2 text-lg font-semibold">{dict.Description}</h3>
            <div className="relative">
              <FormField
                control={form.control}
                name="description.hy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="pr-20">
                      <Textarea
                        className="h-[240px]"
                        placeholder={dict.writeDescription}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="relative">
              <FormField
                control={form.control}
                name="description.en"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="pr-20">
                      <TextareaGroup
                        field={field}
                        placeholder={dict.writeDescription}
                        label={dict.WriteEnDescription}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="description.rus"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="pr-20">
                        <TextareaGroup
                          field={field}
                          placeholder={dict.writeDescription}
                          label={dict.WriteRusDescription}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <IsBestOffer form={form} dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
