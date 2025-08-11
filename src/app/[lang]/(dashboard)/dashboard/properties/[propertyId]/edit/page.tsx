import { langType } from "@/app/[lang]/(main)/page";
import PropertyForm from "@/components/dashboard/forms/PropertyForm";
import {
  Contact,
  PropertyForm as PropertyFormType,
  SingeProperty,
  SinglePropertyDict,
} from "@/lib/db/type";
import { getCurrencyRate } from "@/lib/getCurrrencyRate";
import { getAdminDictionary, getDectionary } from "@/lib/getDictionary";
import { CurrencyRate } from "@/utils/convertCurrency";
import getIp from "@/utils/getIp";
import { getProperty } from "../../action";

export default async function PropertyEditPage({
  params: { propertyId, lang },
}: {
  params: { propertyId: number; lang: langType };
}) {
  const propertyData = await getProperty(null, propertyId);
  const dict: PropertyFormType = await getAdminDictionary(lang, "propertyForm");
  const dict2: SinglePropertyDict = await getAdminDictionary(
    lang,
    "singleProperty",
  );
  const singePropertyDict: SingeProperty = await getDectionary(
    lang,
    "singeProperty",
  );
  const ipInfo = await getIp();

  const contactDict: Contact = await getDectionary(lang, "contact");

  const rate = (await getCurrencyRate(
    propertyData.price.currency,
  )) as CurrencyRate;
  return (
    <div className="flex flex-col">
      <PropertyForm
        {...{ dict2, rate, singePropertyDict, ipInfo, contactDict }}
        lang={lang}
        propertyData={propertyData}
        dict={dict}
      />
    </div>
  );
}
