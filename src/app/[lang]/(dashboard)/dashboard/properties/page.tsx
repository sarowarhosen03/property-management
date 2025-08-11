import { langType } from "@/app/[lang]/(main)/page";
import { auth } from "@/auth";
import { Loader } from "@/components/common/Loader";
import PropertyNav from "@/components/dashboard/properties/Nav";
import PropertySearchForm from "@/components/dashboard/properties/Search";
import { AdminProperties, Properties } from "@/lib/db/type";
import { getRateForAllCurrency } from "@/lib/getCurrrencyRate";
import { getAdminDictionary, getDectionary } from "@/lib/getDictionary";
import { currencyList } from "@/utils/convertCurrency";
import { FC, Suspense } from "react";
import MoreProperties from "./components/MoreProperties";

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface PropertyPageProps {
  searchParams: SearchParams;
  params: { lang: langType };
}

export const revalidate = 0;

const PropertiesPage: FC<PropertyPageProps> = async ({ params: { lang } }) => {
  const dict: Properties = await getDectionary(lang, "properties");
  const user = await auth();
  const role = user?.user?.role;

  const adminProperties: AdminProperties = await getAdminDictionary(
    lang,
    "properties",
  );

  const rateList = await getRateForAllCurrency(
    undefined,
    currencyList.map((i) => i.code),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-end justify-between">
        <PropertyNav dict={adminProperties} />
        <PropertySearchForm dict={adminProperties} />
      </div>

      <Suspense fallback={<Loader />}>
        <MoreProperties
          dict={dict}
          seeMore={adminProperties.seeMore}
          rateList={rateList}
          role={role}
          notFound={dict.propertyNotFound}
        />
      </Suspense>
    </div>
  );
};

export default PropertiesPage;
