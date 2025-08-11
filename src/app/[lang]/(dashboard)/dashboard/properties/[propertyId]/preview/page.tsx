import { langType } from "@/app/[lang]/(main)/page";
import { auth } from "@/auth";
import { PropertyInfo } from "@/components/common/single-product/SingleProduct";
import { PropertyStatusHeadline } from "@/components/dashboard/properties/property/PropertyStatusHeader/PropertyStatusHeadline";
import { Button } from "@/components/ui/button";
import { SingeProperty, SinglePropertyDict } from "@/lib/db/type";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { getAdminDictionary, getDectionary } from "@/lib/getDictionary";
import { StatusOptions } from "@/types";
import { Contact } from "@/types/fetchDataTypes";
import { CurrencyRate } from "@/utils/convertCurrency";
import getIp from "@/utils/getIp";
import Link from "next/link";
import { FC } from "react";
import { getProperty } from "../../action";
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

interface PropertyPageProps {
  params: {
    propertyId: string;
    lang: langType;
  };
}

const PropertyPage: FC<PropertyPageProps> = async ({ params }) => {
  const session = await auth();
  const token = session?.user.token as string;
  const { propertyId, lang } = params;

  const property = await getProperty(token, propertyId);
  const dict: SinglePropertyDict = await getAdminDictionary(
    lang,
    "singleProperty",
  );
  const singePropertyDict: SingeProperty = await getDectionary(
    lang,
    "singeProperty",
  );
  const ipInfo = await getIp();
  const rate = (await getCurrencyRate(property.price.currency)) as CurrencyRate;
  const contactDict: Contact = await getDectionary(lang, "contact");

  return (
    <>
      <div className="w-3/5 max-w-[504px]">
        <PropertyStatusHeadline
          title={dict["Post an Ad?"]}
          options={options[lang]}
        />
      </div>
      <PropertyInfo
        ipInfo={ipInfo}
        contactDict={contactDict}
        rate={rate}
        property={property}
        isFromDashBoard={true}
        lang={lang}
        propertyId={propertyId}
        singePropertyDict={singePropertyDict}
      />
      <div className="mt-8 flex gap-8">
        <Button variant={"tertiary"}>
          <Link href={`/dashboard/properties/${propertyId}/edit`}>
            {dict.Edit}
          </Link>
        </Button>
        <Button variant={"primary"} asChild className="cursor-pointer">
          <Link href={`/${lang}/dashboard/properties/${propertyId}/post`}>
            {dict.Preview}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default PropertyPage;
export const revalidate = 0;
