import { langType } from "@/app/[lang]/(main)/page";
import { auth } from "@/auth";
import SingleLoader from "@/components/common/loader/SingleLoader";
import { PropertyInfo } from "@/components/common/single-product/SingleProduct";

import { PropertyPageHeader } from "@/components/dashboard/properties/property/PropertyPageHeader";
import { SingeProperty, SinglePropertyDict } from "@/lib/db/type";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { getAdminDictionary, getDectionary } from "@/lib/getDictionary";
import { Contact } from "@/types/fetchDataTypes";
import { CurrencyRate } from "@/utils/convertCurrency";
import getIp from "@/utils/getIp";
import { isAdmin, isPropertyAgent } from "@/utils/user";
import { redirect } from "next/navigation";
import { FC, Suspense } from "react";
import { getProperty } from "../action";

interface PropertyPageProps {
  params: {
    propertyId: string;
    lang: langType;
  };
}

const PropertyPage: FC<PropertyPageProps> = async ({ params }) => {
  const session = await auth();
  const { token, id: userId, role } = session?.user as any;
  const { propertyId, lang } = params;
  const property = await getProperty(token, propertyId);

  console.log(
    role,
    !isAdmin(role) && !isPropertyAgent(property.agentId._id, userId),
  );

  if (
    !property ||
    (!isAdmin(role) && !isPropertyAgent(property.agentId._id, userId))
  ) {
    return redirect(`/dashboard/properties/`);
  }

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
      <PropertyPageHeader
        auth={session?.user as any}
        propertyId={propertyId}
        property={property}
        dict={dict}
      />
      <Suspense fallback={<SingleLoader />}>
        <PropertyInfo
          property={property}
          lang={lang}
          contactDict={contactDict}
          rate={rate}
          isFromDashBoard={true}
          propertyId={params.propertyId}
          singePropertyDict={singePropertyDict}
          ipInfo={ipInfo}
        />
      </Suspense>
    </>
  );
};

export const revalidate = 0;
export default PropertyPage;
