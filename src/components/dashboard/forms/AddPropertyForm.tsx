"use client";

import { langType } from "@/app/[lang]/(main)/page";
import { Loader } from "@/components/common/Loader";
import { showToast } from "@/components/common/toaster/toaster";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { PropertyForm } from "@/lib/db/type";
import { PropertyType } from "@/lib/Propertyschema";
import { hardReload } from "@/lib/reload";
import useStore from "@/store/useStore";
import ApartmentIcon from "@/svgs/apartment.svg";
import HouseIcon from "@/svgs/building-construction.svg";
import CommercialIcon from "@/svgs/commercial.svg";
import LandIcon from "@/svgs/land.svg";
import { CategoryType, ChooseType } from "@/types";
import getTranslatedProvinceDistrict from "@/utils/translatedProvinceDistric";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Zod from "zod";
import ImageUploader from "../inputs/ImageUploader";
import addProperty from "./_actions/addProperty";
import ApartmentForm from "./_components/ApartmentForm";
import CommercialForm from "./_components/CommercialForm";
import HouseForm from "./_components/HouseForm";
import LandForm from "./_components/LandForm";
import RadioGroup from "./_components/RadioGroup";
import generatePropertySchema from "./_schema/generatePropertySchema";
import generateDefaultValues from "./_utils/generateDefaultValues ";

export const listingType = {
  en: [
    { value: "buy", label: "Buy" },
    { value: "rent", label: "Rent" },
    { value: "daily rent", label: "Daily rent" },
  ],
  hy: [
    { value: "buy", label: "Վաճառք" },
    { value: "rent", label: "Վարձակալություն" },
    { value: "daily rent", label: "Օրավարձ" },
  ],
  rus: [
    { value: "buy", label: "Купить" },
    { value: "rent", label: "Аренда" },
    { value: "daily rent", label: "Посуточная аренда" },
  ],
};

export const propertyTypes = {
  buy: {
    en: [
      { value: "house", label: "House", icon: <HouseIcon /> },
      { value: "apartment", label: "Apartment", icon: <ApartmentIcon /> },
      { value: "commercial", label: "Commercial", icon: <CommercialIcon /> },
      { value: "land", label: "Land", icon: <LandIcon /> },
    ],
    hy: [
      { value: "house", label: "Տուն", icon: <HouseIcon /> },
      { value: "apartment", label: "Բնակարան", icon: <ApartmentIcon /> },
      {
        value: "commercial",
        label: "Առևտրային տարածք",
        icon: <CommercialIcon />,
      },
      { value: "land", label: "Հողատարածք", icon: <LandIcon /> },
    ],
    rus: [
      { value: "house", label: "Дом", icon: <HouseIcon /> },
      { value: "apartment", label: "Квартира", icon: <ApartmentIcon /> },
      {
        value: "commercial",
        label: "Коммерческая недвижимость",
        icon: <CommercialIcon />,
      },
      { value: "land", label: "Земля", icon: <LandIcon /> },
    ],
  },
  rent: {
    en: [
      { value: "house", label: "House", icon: <HouseIcon /> },
      { value: "apartment", label: "Apartment", icon: <ApartmentIcon /> },
      { value: "commercial", label: "Commercial", icon: <CommercialIcon /> },
    ],
    hy: [
      { value: "house", label: "Տուն", icon: <HouseIcon /> },
      { value: "apartment", label: "Բնակարան", icon: <ApartmentIcon /> },
      {
        value: "commercial",
        label: "Առևտրային տարածք",
        icon: <CommercialIcon />,
      },
    ],
    rus: [
      { value: "house", label: "Дом", icon: <HouseIcon /> },
      { value: "apartment", label: "Квартира", icon: <ApartmentIcon /> },
      {
        value: "commercial",
        label: "Коммерческая недвижимость",
        icon: <CommercialIcon />,
      },
    ],
  },
  dailyRent: {
    en: [
      { value: "house", label: "House", icon: <HouseIcon /> },
      { value: "apartment", label: "Apartment", icon: <ApartmentIcon /> },
    ],
    hy: [
      { value: "house", label: "Տուն", icon: <HouseIcon /> },
      { value: "apartment", label: "Բնակարան", icon: <ApartmentIcon /> },
    ],
    rus: [
      { value: "house", label: "Дом", icon: <HouseIcon /> },
      { value: "apartment", label: "Квартира", icon: <ApartmentIcon /> },
    ],
  },
};

let propertyType = { ...propertyTypes.buy };

export default function AddPropertyForm({
  lang,
  dict,
}: {
  lang: langType;
  dict: PropertyForm;
}) {
  const { isContractBased } = useStore();
  const [type, setType] = useState<ChooseType>("house");
  const [category, setCategory] = useState<CategoryType>("buy");

  if (category === "daily rent") {
    propertyType = { ...propertyTypes.dailyRent };
  }
  if (category === "rent") {
    propertyType = { ...propertyTypes.rent };
  }
  if (category === "buy") {
    propertyType = { ...propertyTypes.buy };
  }

  const form = useForm<PropertyType>({
    resolver: zodResolver(
      generatePropertySchema(type, category, lang, dict, isContractBased) ||
        Zod.object({}),
    ),
    mode: "all",
    defaultValues: generateDefaultValues(type, category),
  });

  const session = useSession();
  const user = session?.data?.user;
  const token = user?.token as string;
  const userId = user?.id as string;

  const onSubmit = async (data: any) => {
    const { isdraft = false } = data || {};
    try {
      data.type = type;
      data.category = category;

      //state and city start
      const { city, state } = getTranslatedProvinceDistrict({
        from: lang,
        to: "en",
        state: form.getValues("location.state"),
        city: form.getValues("location.city"),
      });
      data.location.city = city;
      data.location.state = state;
      //state and city end
      if (form.getValues("location.latitude")) {
        data.location.latitude = form.getValues("location.latitude");
      }
      if (form.getValues("location.longitude")) {
        data.location.longitude = form.getValues("location.longitude");
      }

      data.price.amount = parseFloat(
        form.getValues("price.amount").replace(/,/g, ""),
      );

      if (isdraft === true) {
        data.status = "draft";
      }

      // If Contact Base then Remove Price
      if (isContractBased) {
        data.price = {
          amount: "",
          currency: "USD",
        };
      }

      const propertyResponse = await addProperty({ data, userId, token });
      setIsOpen(false);

      if (propertyResponse.code != 201) {
        throw propertyResponse;
      }

      const reloadPath = isdraft
        ? `/${lang}/dashboard/properties?status=draft`
        : `/${lang}/dashboard/properties/${propertyResponse?.data?._id}/preview`;

      hardReload(reloadPath);
    } catch (err) {
      const duplicateValueChecking =
        /Field value: "\w+" already exists\. Please use another\./;
      if (err instanceof Error && duplicateValueChecking.test(err.message)) {
        showToast({
          message: dict["This property already exists in your account."],
          type: "success",
          title: dict["Duplicate Error"],
        });
      } else {
        showToast({
          message: (err as Error).message,
          type: "error",
          title: dict["Error"],
        });
      }
    }
  };
  const setValue = useMemo(() => form.setValue, [form]);

  const floor = form.watch("details.floor") as string;

  useEffect(() => {
    if (floor?.length === 1 && !floor.includes("/")) {
      setValue("details.floor", floor + "/");
    }
    if (floor && floor?.includes("/")) {
      const [numberOfFloor, totalFloor] = floor ? floor.split("/") : ["", ""];
      setValue("details.floorNumber", numberOfFloor);
      setValue("details.totalFloors", totalFloor);
    }
  }, [floor, setValue]);

  const price = form.watch("price.amount");

  useEffect(() => {
    if (price) {
      const formattedNumber = parseFloat(price.toString().replace(/,/g, ""));
      formattedNumber &&
        setValue("price.amount", formattedNumber.toLocaleString("en-US"));
    }
  }, [price, setValue]);

  const [isOpen, setIsOpen] = useState(false);
  const { back } = useRouter();
  const errorFn = (e) => {
    console.log(e);
  };
  return (
    <>
      <div>
        <div className="mt-8 w-full space-y-8">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">
              {dict["Choose category"]}
            </h3>
            <RadioGroup
              fields={listingType[lang]}
              onChange={(value: any) => {
                setCategory(value);
                setType("house");
                form.reset(generateDefaultValues("house", value), {
                  keepDirtyValues: true,
                });
              }}
              value={category}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">{dict.chooseType}</h3>
            <RadioGroup
              fields={propertyType[lang]}
              onChange={(value: any) => {
                setType(value);
                form.reset(generateDefaultValues(value, category), {
                  keepDirtyValues: true,
                });
              }}
              value={type}
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onError={errorFn}>
              {(() => {
                switch (type) {
                  case "house":
                    return (
                      <HouseForm
                        category={category}
                        type={type}
                        form={form}
                        lang={lang}
                        dict={dict}
                      />
                    );

                  case "apartment":
                    return (
                      <ApartmentForm
                        category={category}
                        type={type}
                        form={form}
                        lang={lang}
                        dict={dict}
                      />
                    );

                  case "commercial":
                    return (
                      <CommercialForm
                        category={category}
                        type={type}
                        form={form}
                        lang={lang}
                        dict={dict}
                      />
                    );

                  case "land":
                    return (
                      <LandForm
                        category={category}
                        type={type}
                        form={form}
                        lang={lang}
                        dict={dict}
                      />
                    );

                  default:
                    return null;
                }
              })()}

              <div className="mt-5 grid grid-cols-5 gap-2">
                <div>
                  <FormField
                    control={form.control}
                    name="socials.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormControl className="pr-20">
                            <Input {...field} placeholder="Facebook URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="socials.instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormControl className="pr-20">
                            <Input {...field} placeholder="Instagram URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="socials.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormControl className="pr-20">
                            <Input {...field} placeholder="Twitter URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="socials.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormControl className="pr-20">
                            <Input {...field} placeholder="Linkedin URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="socials.youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormControl className="pr-20">
                            <Input {...field} placeholder="Youtube URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-6">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                      <FormItem>
                        <ImageUploader
                          images={form.getValues("images")}
                          dict={dict}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-8">
                <Button
                  type="button"
                  variant={"tertiary"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                >
                  {dict.Cancel}
                </Button>
                <Button
                  type="submit"
                  className="flex gap-4 disabled:cursor-not-allowed disabled:bg-yellow-200"
                  disabled={form.formState.isSubmitting}
                >
                  {dict.Preview}{" "}
                  {!isOpen && form.formState.isSubmitting && <Loader />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Modal
        className={{
          title: "text-black",
          description: "text-black",
        }}
        isOpen={isOpen}
        title={dict["Cancel Action"]}
        description={
          dict["Do you want to cancel this action or move it to draft?"]
        }
        onClose={() => setIsOpen(false)}
      >
        <div className="flex w-full justify-between">
          <Button
            onClick={() => {
              setIsOpen(false);
              back();
            }}
            className="bg-red-500 text-white"
          >
            {dict.Delete}
          </Button>
          <Button
            className="flex gap-4 bg-white text-black"
            onClick={() => {
              form.handleSubmit(
                async (data) => {
                  await onSubmit({ ...data, isdraft: true });
                },
                () => {
                  showToast({
                    message: dict.pleaseResolveTheErrorsBeforeSovingToDraft,
                    type: "warning",
                    title: dict.Validation,
                  });
                  setIsOpen(false);
                },
              )();
            }}
          >
            {dict.moveToDraft}
            {form.formState.isSubmitting && <Loader />}
          </Button>
        </div>
      </Modal>
    </>
  );
}
