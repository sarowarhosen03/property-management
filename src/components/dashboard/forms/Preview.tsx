"use client";
import { langType } from "@/app/[lang]/(main)/page";
import { Loader } from "@/components/common/Loader";
import { PropertyInfo } from "@/components/common/single-product/SingleProduct";
import { showToast } from "@/components/common/toaster/toaster";
import { PropertyStatusHeadline } from "@/components/dashboard/properties/property/PropertyStatusHeader/PropertyStatusHeadline";
import { Button } from "@/components/ui/button";
import { hardReload } from "@/lib/reload";
import { revalidateByTag } from "@/lib/revalidateCache";
import { StatusOptions } from "@/types";
import { useState } from "react";
import updateProperty from "./_actions/updateProperty";

const options: {
  en: StatusOptions[];
  hy: StatusOptions[];
  rus: StatusOptions[];
} = {
  en: [
    { label: "Fill in", status: "active", className: "w-1/3" },
    { label: "Preview", status: "inactive", className: "w-1/3" },
    {
      label: "Post",
      status: "disabled",
      className: "w-1/3",
      isHideBorder: true,
    },
  ],
  hy: [
    { label: "Լրացնել", status: "active", className: "w-1/3" },
    { label: "Նախադիտում", status: "inactive", className: "w-1/3" },
    {
      label: "Հրապարակել",
      status: "disabled",
      className: "w-1/3",
      isHideBorder: true,
    },
  ],
  rus: [
    { label: "Заполнить", status: "active", className: "w-1/3" },
    { label: "Предпросмотр", status: "inactive", className: "w-1/3" },
    {
      label: "   Опубликовать",
      status: "disabled",
      className: "w-1/3",
      isHideBorder: true,
    },
  ],
};

const PreviewPage = ({
  property,
  lang,
  dict,
  singePropertyDict,
  ipInfo,
  contactDict,
  rate,
  token,
  setIsPreviewMode,
  propertyData,
  dict2,
}: {
  property?: any;
  lang?: langType;
  dict?: any;
  singePropertyDict?: any;
  ipInfo?: any;
  contactDict?: any;
  rate?: any;
  token?: any;
  setIsPreviewMode?: any;
  propertyData?: any;
  dict2?: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const propertyId = property?._id?.trim();

  async function updatePropertyInfo(data: any) {
    setIsLoading(true);
    try {
      if (data?.isContractBased) {
        data.price.amount = "";
      }
      data.status = "draft";
      const propertyResponse = await updateProperty({
        data,
        token,
        prevImag: propertyData?.images,
        propertyId: propertyData?._id,
      });

      if (propertyResponse.code === 200) {
        revalidateByTag("properties");
        revalidateByTag(propertyResponse?.data._id);
        showToast({
          message: dict2["Property Updated successfully"],
          type: "success",
          title: dict2.Success,
        });

        hardReload(`/${lang}/dashboard/properties/${propertyId}/post`);
      }
    } catch (err: any) {
      showToast({
        message: err?.message,
        type: "error",
        title: dict2.Error,
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-3/5 max-w-[504px]">
        <PropertyStatusHeadline
          title={dict["Post an Ad?"]}
          options={options[lang as langType]}
        />
      </div>
      <PropertyInfo
        ipInfo={ipInfo}
        contactDict={contactDict}
        rate={rate}
        property={{
          ...property,
          updatedAt: propertyData?.updatedAt,
        }}
        isFromDashBoard={true}
        lang={lang as langType}
        propertyId={propertyId}
        singePropertyDict={singePropertyDict}
      />
      <div className="mt-8 flex gap-8">
        <Button variant="tertiary" onClick={() => setIsPreviewMode(false)}>
          <div>{dict.Edit}</div>
        </Button>
        <Button
          variant={"primary"}
          asChild
          className="cursor-pointer"
          onClick={async () => {
            await updatePropertyInfo(property);
          }}
        >
          <div>
            {dict.Preview} {isLoading && <Loader />}
          </div>
        </Button>
      </div>
    </>
  );
};
export default PreviewPage;
