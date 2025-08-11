import { getAdminDictionary } from "@/lib/getDictionary";
import {
  getPropertyCount,
  getStatisticsForAMonth,
} from "@/lib/propertyAnalitics";
import { StatisticsUpdateResponse } from "@/types/fetchDataTypes";
import Statistics from "./_components/Statistics";

type Language = "en" | "rus" | "hy";
interface StatisticsPageProps {
  params: { lang: Language };
}

export default async function page({ params: { lang } }: StatisticsPageProps) {
  const dashboardDict = await getAdminDictionary(lang, "dashboard");
  const data = (await getStatisticsForAMonth()) as StatisticsUpdateResponse;
  const res = await getPropertyCount();
  return (
    <>
      <Statistics
        res={res}
        dashboardDict={dashboardDict}
        lang={lang}
        data={data}
      />
    </>
  );
}
