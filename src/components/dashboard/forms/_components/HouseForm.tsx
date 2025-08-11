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
import { UseFormReturn } from "react-hook-form";

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
import { roomsOptions } from "@/lib/feildData";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import { currencyList } from "@/utils/convertCurrency";
import { useEffect, useState } from "react";
import CheckboxGroup from "../../inputs/CheckboxGroup";
import { RadioGroup } from "../../inputs/RadioGroup";
import { TextareaGroup } from "../../inputs/TextareaGroup";
import YandexMap from "../../inputs/YandexMap";
import IsBestOffer from "./IsBestOffer";

const houseType = {
  en: [
    { value: "house", label: "House" },
    { value: "luxury private house", label: "Luxury Private House" },
    { value: "townhouses", label: "Townhouse" },
    { value: "country House", label: "Country House" },
  ],
  hy: [
    { value: "house", label: "Տուն" },
    { value: "luxury private house", label: "Շքեղ առանձնատուն" },
    { value: "townhouses", label: "Թաուն Հաուս" },
    { value: "country House", label: "Ամառանոց" },
  ],
  rus: [
    { value: "house", label: "Дом" },
    { value: "luxury private house", label: "Роскошный частный дом" },
    { value: "townhouses", label: "Таунхаусы" },
    { value: "country House", label: "Загородный дом" },
  ],
};

const constructionOptions = {
  en: [
    { value: "stone", label: "Stone" },
    { value: "bricks", label: "Bricks" },
    { value: "wooden", label: "Wooden" },
  ],
  hy: [
    { value: "stone", label: "Քարե" },
    { value: "bricks", label: "Աղյուսե" },
    { value: "wooden", label: "Փայտե" },
  ],
  rus: [
    { value: "stone", label: "Камень" },
    { value: "bricks", label: "Кирпич" },
    { value: "wooden", label: "Деревянный" },
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

export const floorOptions = {
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
    { value: "no renovation", label: "никакого ремонта" },
    { value: "needs renovation", label: "Требуется ремонт" },
    { value: "cosmetic renovation", label: "Косметический" },
    { value: "major renovation", label: "Капитальный" },
    { value: "designer renovation", label: "Дизайнерский" },
  ],
};

export const projectType = {
  en: [
    { value: "new construction", label: "New construction" },
    { value: "by Developer", label: "By Developer" },
    { value: "investment", label: "Investment" },
  ],
  hy: [
    { value: "new construction", label: "Նորակառույց" },
    { value: "by Developer", label: "Շինարարից" },
    { value: "investment", label: "Ներդրումային" },
  ],
  rus: [
    { value: "new construction", label: "Новое строительство" },
    { value: "by Developer", label: "От застройщика" },
    { value: "investment", label: "Инвестиции" },
  ],
};

const furnitureOptions = {
  en: [
    { value: "available", label: "Available" },
    { value: "no available", label: "No Available" },
    { value: "partial furniture", label: "Partial Furniture" },
  ],
  hy: [
    { value: "available", label: "Առկա է" },
    { value: "no available", label: "Առկա չէ" },
    { value: "partial furniture", label: "Մասնակի կահավորված" },
  ],
  rus: [
    { value: "available", label: "Доступно" },
    { value: "no available", label: "Недоступно" },
    { value: "partial furniture", label: "Частично меблировано" },
  ],
};

export default function HouseForm({
  category,
  lang,
  form,
  type,
  dict,
  //onLocation,
  defaultData,
}: {
  dict: PropertyForm;
  lang: langType;
  category: string;
  isEditMode?: boolean;
  form: UseFormReturn<any>;
  type: string;
  // eslint-disable-next-line no-unused-vars
  //onLocation: (location: any) => void;
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
  const contractValues = form.getValues("isContractBased") ?? false;

  useEffect(() => {
    setIsContractBased(contractValues);
  }, [contractValues]);

  return (
    <>
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

      <div className="my-5 grid grid-cols-2 gap-x-6">
        <div className="col grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold capitalize">
              {dict["House type"]}
            </h3>
            <FormField
              control={form.control}
              name="houseType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      field={field}
                      options={houseType[lang]}
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
            <h3 className="mb-4 text-lg font-semibold capitalize">
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
        </div>
        <div className="col">
          <div className="mt-8 flex flex-col">
            <h3 className="mb-4 text-lg font-semibold capitalize">
              {dict.numberOfRooms}
            </h3>

            <FormField
              control={form.control}
              name="details.bedrooms"
              defaultValue={"0"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      field={field}
                      variant="rounded"
                      options={roomsOptions[lang]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8 flex flex-col">
            <h3 className="mb-4 text-lg font-semibold capitalize">
              {dict.numberOfBathroom}
            </h3>

            <FormField
              control={form.control}
              name="details.bathrooms"
              defaultValue={"1"}
              render={({ field }) => {
                return (
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
                );
              }}
            />
          </div>
          {category === "buy" && (
            <>
              <div className="mt-8 flex flex-col">
                <h3 className="mb-4 text-lg font-semibold capitalize">
                  {dict.numberOfFloors}
                </h3>

                <FormField
                  control={form.control}
                  name="details.totalFloors"
                  defaultValue={"1"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          field={field}
                          variant="rounded"
                          options={floorOptions[lang]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold capitalize">
              {dict.Renovation}
            </h3>

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
        {category === "rent" && (
          <div className="col">
            <div className="flex flex-col">
              <h3 className="mb-4 text-lg font-semibold capitalize">
                {dict.Furniture}
              </h3>
              <FormField
                control={form.control}
                name="furniture"
                defaultValue={"available"}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          field={field}
                          options={furnitureOptions[lang]}
                          className="flex h-auto flex-col items-start gap-y-4"
                          variant="rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
        )}
        <div className="col">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold capitalize">
              {dict.Utilities}
            </h3>

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
            <h3 className="mb-4 text-lg font-semibold capitalize">
              {dict.Additional}
            </h3>

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
            {category === "rent" && dict.monthlyFee}
            {category === "daily rent" && dict.dailyFee}
            {category === "buy" && dict.price}
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
                        placeholder={dict.enterPrice}
                        disabled={isContractBased!}
                        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="price.currency"
                      render={({ field }) => (
                        <Select
                          disabled={isContractBased!}
                          {...field}
                          defaultValue={currencyList[0].code}
                          onValueChange={field.onChange}
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
                  <FormControl>
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
        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">{dict["Land surface"]}</h3>
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

        <div className="flex flex-col">
          <h3 className="mb-2 text-lg font-semibold">
            {category === "buy" ? dict.HouseArea : dict.houseSurface}{" "}
            {`(${dict.sqM})`}{" "}
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
