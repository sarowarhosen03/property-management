"use client";

import { langType } from "@/app/[lang]/(main)/page";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PropertyForm } from "@/lib/db/type";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import { currencyList } from "@/utils/convertCurrency";
import { useEffect, useState } from "react";
import CheckboxGroup from "../../inputs/CheckboxGroup";
import { TextareaGroup } from "../../inputs/TextareaGroup";
import YandexMap from "../../inputs/YandexMap";
import IsBestOffer from "./IsBestOffer";
const projectType = {
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

const significanceOptions = {
  en: [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
    { value: "garden", label: "Garden" },
    { value: "other", label: "Other" },
  ],
  hy: [
    { value: "residential", label: "Բնակելի" },
    { value: "commercial", label: "Կոմերցիոն" },
    { value: "land", label: "Հողամաս" },
    { value: "garden", label: "Այգի" },
    { value: "other", label: "Այլ" },
  ],
  rus: [
    { value: "residential", label: "Жилой" },
    { value: "commercial", label: "Коммерческий" },
    { value: "land", label: "Земля" },
    { value: "garden", label: "Сад" },
    { value: "other", label: "Другое" },
  ],
};

const utilities = {
  en: [{ value: "fenced", label: "Fenced" }],
  hy: [{ value: "fenced", label: "Ցանկապատված" }],
  rus: [{ value: "fenced", label: "Огороженный" }],
};

export default function LandForm({
  category,
  lang,
  form,
  type,
  dict,
}: {
  dict: PropertyForm;
  lang: langType;
  category: string;
  form: any;
  type: string;
}) {
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

      <div className="my-5 flex flex-col">
        <h3 className="mb-4 text-lg font-semibold">{dict.Significance}</h3>

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
                    options={utilities[lang]}
                    className="flex h-auto flex-col items-start gap-y-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        disabled={isContractBased}
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
                          disabled={isContractBased}
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
      </div>

      <div className="mt-5 grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <h3 className="mb-2 text-lg font-semibold">{dict.Address}</h3>

          <YandexMap type={type} form={form} dict={dict} />
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
