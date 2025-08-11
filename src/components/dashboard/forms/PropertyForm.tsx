/* eslint-disable no-unused-vars */
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
import { PropertyForm as PropertyFormType } from "@/lib/db/type";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { PropertyType } from "@/lib/Propertyschema";
import { hardReload } from "@/lib/reload";
import useStore from "@/store/useStore";
import { CategoryType } from "@/types";
import { CurrencyRate } from "@/utils/convertCurrency";
import getTranslatedProvinceDistrict from "@/utils/translatedProvinceDistric";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "../inputs/ImageUploader";
import updateProperty from "./_actions/updateProperty";
import ApartmentForm from "./_components/ApartmentForm";
import CommercialForm from "./_components/CommercialForm";
import HouseForm from "./_components/HouseForm";
import LandForm from "./_components/LandForm";
import RadioGroup from "./_components/RadioGroup";
import generatePropertySchema from "./_schema/generatePropertySchema";
import { listingType, propertyTypes } from "./AddPropertyForm";
import PreviewPage from "./Preview";

let propertyType = { ...propertyTypes.buy };

export default function PropertyForm({
  lang,
  propertyData,
  dict,
  dict2,
  singePropertyDict,
  ipInfo,
  contactDict,
  rate,
}: {
  dict: PropertyFormType;
  lang: langType;
  propertyData: any;
  dict2: any;
  singePropertyDict: any;
  ipInfo: any;
  contactDict: any;
  rate?: any;
}) {
  const { isContractBased } = useStore();
  const [rateState, setRateState] = useState(rate);
  const [type, setType] = useState(propertyData.type);
  const [category, setCategory] = useState(propertyData.category);
  if (category === "daily rent") {
    propertyType = { ...propertyTypes.dailyRent };
  }
  if (category === "rent") {
    propertyType = { ...propertyTypes.rent };
  }
  if (category === "buy") {
    propertyType = { ...propertyTypes.buy };
  }
  const [locationDetails, setLocationDetails] = useState(propertyData.location);

  const form = useForm<PropertyType>({
    resolver: zodResolver(
      generatePropertySchema(type, category, lang, dict, isContractBased),
    ),
    mode: "onChange",
    defaultValues: async () => {
      const totalFloors = propertyData.details.totalFloors;
      const floorNumber = propertyData.details.floorNumber;
      const floor = `${floorNumber}/${totalFloors}`;
      propertyData.details.floor = floor;
      //state and city start
      const { city, state } = getTranslatedProvinceDistrict({
        from: "en",
        to: lang,
        state: propertyData.location.state,
        city: propertyData.location.city,
      });
      propertyData.location.state = state;
      propertyData.location.state = state;
      propertyData.location.city = city;

      return {
        ...propertyData,
        isContractBased: propertyData?.isContractBased ?? false,
        price: {
          ...propertyData.price,
          amount: propertyData?.price?.amount ?? "0",
        },
      };
    },
  });

  const session = useSession();
  const user = session?.data?.user;
  const token = user?.token as string;
  const { propertyId } = useParams();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const onSubmit = async function (data: any) {
    try {
      const { isdraft = false } = data || {};
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
      if (form.getValues("location.longitude")) {
        data.location.longitude = form
          .getValues("location.longitude")
          .toString();
      }
      if (form.getValues("location.latitude")) {
        data.location.latitude = form.getValues("location.latitude").toString();
      }

      data.price.amount = parseFloat(
        form.getValues("price.amount").replace(/,/g, ""),
      );
      data.status = isdraft ? "draft" : "published";

      if (!isdraft) {
        return setIsPreviewMode(data);
      }
      // If Contact Base then Remove Price
      if (data?.isContractBased) {
        data.price = { amount: "", currency: data?.price?.currency };
      }

      const propertyResponse = await updateProperty({
        data,
        token,
        prevImag: propertyData?.images,
        propertyId: propertyId as string,
      });
      setIsOpen(false);

      if (propertyResponse.code === 200) {
        const message = isdraft
          ? dict["Property Updated and moved to draft"]
          : dict["Property Updated successfully"];

        const type = isdraft ? "info" : "success";
        const title = isdraft ? dict.Info : dict.Success;

        showToast({ message, type, title });

        const url = isdraft
          ? `/${lang}/dashboard/properties?status=draft`
          : `/${lang}/dashboard/properties/${propertyResponse?.data?._id}/preview`;
        revalidatePath("/[lang]/(dashboard)/dashboard/properties", "layout");
        revalidatePath("/[lang]/(main)/properties", "layout");
        hardReload(url);
      }
    } catch (err: any) {
      showToast({
        message: err?.message,
        type: "error",
        title: dict.Error,
      });
    }
  };

  const setValue = useMemo(() => form.setValue, [form]);
  // const { bedrooms, totalAreas, totalFloors, floorNumber, area, bathrooms } =
  //   form.watch("details") || {};
  // const renovation = form.watch("renovation");
  // const prevTitle = propertyData.title.en;
  // const floor = form.watch("details.floor") as string;
  // const generatedTitle = generateTitle({
  //   type,
  //   bedrooms,
  //   totalFloors,
  //   floorNumber,
  //   totalAreas,
  //   area,
  //   renovation,
  // });
  // const enT = generatedTitle["en"];
  // const hyT = generatedTitle["hy"];
  // const rusT = generatedTitle["rus"];
  // const generatedTitleFromPrev = generateTitle({
  //   type,
  //   bedrooms: propertyData.details?.bedrooms?.toString() || "",
  //   totalFloors: propertyData.details?.totalFloors?.toString() || "",
  //   floorNumber: propertyData.details?.floorNumber?.toString() || "",
  //   totalAreas: propertyData.details?.totalAreas?.toString() || "",
  //   area: propertyData.details?.area || "",
  //   renovation: propertyData?.renovation || "",
  // });
  // const enTp = generatedTitleFromPrev["en"];
  // const hyTp = generatedTitleFromPrev["hy"];
  // const rusTp = generatedTitleFromPrev["rus"];
  // const customTitleEn = enTp !== enT;
  // const customTitleHy = hyTp !== hyTp;
  // const customTitleRus = rusTp !== rusT;

  // useEffect(() => {
  //   if (!customTitleEn) {
  //     setValue("title.en", enT);
  //   }
  //   if (!customTitleHy) {
  //     setValue("title.hy", hyT);
  //   }
  //   if (!customTitleRus) {
  //     setValue("title.rus", rusT);
  //   }
  // }, [customTitleEn, customTitleHy, customTitleRus, enT, hyT, rusT, setValue]);

  // useEffect(() => {
  //   if (floor?.length === 1 && !floor.includes("/")) {
  //     setValue("details.floor", floor + "/");
  //   }
  //   if (floor && floor?.includes("/")) {
  //     const [numberOfFloor, totalFloor] = floor?.split("/");
  //     setValue("details.floorNumber", numberOfFloor);
  //     setValue("details.totalFloors", totalFloor);
  //   }
  // }, [floor, setValue]);

  //thausend separotr
  const [isOpen, setIsOpen] = useState(false);
  const { back } = useRouter();
  const price = form.watch("price.amount");
  const currency = form.watch("price.currency");

  useEffect(() => {
    if (price) {
      const formattedNumber = parseFloat(price.toString().replace(/,/g, ""));
      formattedNumber &&
        setValue("price.amount", formattedNumber.toLocaleString("en-US"));
    }
  }, [price, setValue]);

  useEffect(() => {
    (async () => {
      const newRate = (await getCurrencyRate(currency)) as CurrencyRate;
      setRateState({ ...newRate });
    })();
  }, [currency]);

  if (isPreviewMode) {
    return (
      <PreviewPage
        {...{
          property: isPreviewMode,
          lang: lang,
          dict: dict2,
          singePropertyDict: singePropertyDict,
          ipInfo,
          contactDict,
          rate: rateState,
          token,
          propertyData,
          dict2: dict,
          setIsPreviewMode,
        }}
      />
    );
  }

  return (
    <>
      <Button
        variant={"normal"}
        size={"normal"}
        className="-ml-4 self-start"
        asChild
      >
        <Link href={`/dashboard/properties/${propertyId}`}>
          <Image
            src="/svgs/arrow-left.svg"
            width={24}
            height={24}
            alt="back"
            className="mr-2 h-6 w-6"
          />
          {dict.Back}
        </Link>
      </Button>

      <div className="mt-3.5 flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{propertyData?.title[lang]}</h2>
        </div>
      </div>

      <div>
        <div className="mt-8 w-full space-y-8">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">
              {dict2["Choose category"]}
            </h3>
            <RadioGroup
              fields={listingType[lang]}
              onChange={(value: any) => {
                setCategory(value);
                setType("house");
                const totalFloors = propertyData.details.totalFloors;
                const floorNumber = propertyData.details.floorNumber;
                const floor = `${floorNumber}/${totalFloors}`;
                propertyData.details.floor = floor;
                propertyData.category = value;
                //form.reset(generateDefaultValues(propertyData));
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
                const totalFloors = propertyData.details.totalFloors;
                const floorNumber = propertyData.details.floorNumber;
                const floor = `${floorNumber}/${totalFloors}`;
                propertyData.details.floor = floor;
                propertyData.type = value;
                //form.reset(generateDefaultValues(propertyData));
              }}
              value={type}
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {(() => {
                switch (type) {
                  case "house":
                    return (
                      <HouseForm
                        category={category}
                        type={type}
                        form={form}
                        defaultData={propertyData}
                        dict={dict}
                        lang={lang}
                      />
                    );
                  case "apartment":
                    return (
                      <ApartmentForm
                        lang={lang}
                        category={category as CategoryType}
                        type={type}
                        form={form}
                        isEditMode={true}
                        onLocation={setLocationDetails}
                        defaultData={propertyData}
                        dict={dict}
                      />
                    );
                  case "commercial":
                    return (
                      <CommercialForm
                        lang={lang}
                        category={category}
                        type={type}
                        form={form}
                        onLocation={setLocationDetails}
                        defaultData={propertyData}
                        dict={dict}
                      />
                    );
                  case "land":
                    return (
                      <LandForm
                        lang={lang}
                        category={category}
                        type={type}
                        form={form}
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
                          images={propertyData?.images}
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
                  className="flex gap-2 disabled:cursor-not-allowed disabled:bg-yellow-200"
                  disabled={form.formState.isSubmitting}
                >
                  {dict.Preview} {form.formState.isSubmitting && <Loader />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Modal
        className={{
          title: "text-white",
          description: "text-white",
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
                    title: dict.Info,
                    type: "info",
                    duration: 5000,
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
