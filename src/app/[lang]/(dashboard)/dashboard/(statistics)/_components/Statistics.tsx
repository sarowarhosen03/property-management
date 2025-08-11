"use client";
import { Chart } from "@/components/dashboard/statistics/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dashboard } from "@/lib/db/type";
import {
  getStatisticsForAllYear,
  getStatisticsForAMonth,
  getStatisticsForAYear,
} from "@/lib/propertyAnalitics";
import TotalProperty from "@/svgs/total-properties.svg";
import Share from "@/svgs/total-share.svg";
import View from "@/svgs/total-view.svg";
import {
  MonthStatistics,
  StatisticsDay,
  StatisticsUpdateResponse,
  StatisticsYearData,
} from "@/types/fetchDataTypes";
import { FunctionComponent, SVGProps, useState } from "react";

// Define language keys to ensure consistency
type Language = "en" | "rus" | "hy";

// Define month list types with languages as keys and months as values
const monthList: Record<Language, Record<number, string>> = {
  en: {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  },
  rus: {
    1: "Январь",
    2: "Февраль",
    3: "Март",
    4: "Апрель",
    5: "Май",
    6: "Июнь",
    7: "Июль",
    8: "Август",
    9: "Сентябрь",
    10: "Октябрь",
    11: "Ноябрь",
    12: "Декабрь",
  },
  hy: {
    1: "Հունվար",
    2: "Փետրվար",
    3: "Մարտ",
    4: "Ապրիլ",
    5: "Մայիս",
    6: "Հունիս",
    7: "Հուլիս",
    8: "Օգոստոս",
    9: "Սեպտեմբեր",
    10: "Հոկտեմբեր",
    11: "Նոյեմբեր",
    12: "Դեկտեմբեր",
  },
};

// Define the component props type for better type safety
interface StatisticsPageProps {
  params: { lang: Language };
}
type StatisticsProps = {
  lang: "en" | "rus" | "hy";
  dashboardDict: Dashboard;
  data: StatisticsUpdateResponse;
};
export default function Statistics({
  lang,
  dashboardDict,
  data,
  res,
}: StatisticsProps) {
  const [filtrType, setFiltrType] = useState("monthly");
  const [monthResponse, setmonthResponse] = useState<StatisticsDay[]>(
    data?.data?.days || [],
  );
  const [yearResponse, setYearResponse] = useState<MonthStatistics[]>([]);
  const [fullYearData, setFullYearData] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState(
    data?.code === 200
      ? {
          totalLikes: data?.data?.totalLikes,
          totalShares: data?.data?.totalShares,
          totalViews: data?.data?.totalViews,
        }
      : {
          totalLikes: 0,
          totalShares: 0,
          totalViews: 0,
        },
  );

  // Monthly chart data transformation
  const chartData = monthResponse.map((data) => {
    const date = new Date(data.date);

    // Use the lang parameter to set the locale dynamically
    const formatter = new Intl.DateTimeFormat(lang, {
      month: "long",
      day: "2-digit",
    });
    const dayFormatter = new Intl.DateTimeFormat(lang, {
      day: "2-digit",
    });

    return {
      label: formatter.format(date),
      value: data.totalViews,
      name: dayFormatter.format(date),
    };
  });

  // Yearly chart data transformation
  const yearChartData = yearResponse.map((data) => {
    const month = data.month;
    return {
      label: `${monthList[lang][month]}-${new Date().getFullYear()}`,
      value: data.totalViews,
      name: monthList[lang][month],
    };
  });
  async function handleFilter(value: string) {
    try {
      if (value === "monthly") {
        const data =
          (await getStatisticsForAMonth()) as StatisticsUpdateResponse;
        if (data.code === 200) {
          setmonthResponse(data.data.days);
          setPropertyInfo({
            totalLikes: data.data.totalLikes,
            totalShares: data.data.totalShares,
            totalViews: data.data.totalViews,
          });
        }
      } else if (value === "yearly") {
        const data = (await getStatisticsForAYear()) as StatisticsYearData;
        if (data.code === 200) {
          setYearResponse(data.data.months);
          setPropertyInfo({
            totalLikes: data.data.totalLikes,
            totalShares: data.data.totalShares,
            totalViews: data.data.totalViews,
          });
        }
      } else if (value === "yearly-all") {
        const data = await getStatisticsForAllYear();
        const result = Object.values(data.data);
        const newData = result.reduce(
          (acc, curr) => {
            return {
              totalLikes: acc?.totalLikes + curr?.totalLikes || 0,
              totalShares: acc?.totalShares + curr?.totalShares || 0,
              totalViews: acc?.totalViews + curr?.totalViews || 0,
            };
          },
          {
            totalLikes: 0,
            totalShares: 0,
            totalViews: 0,
          },
        );
        setPropertyInfo({ ...newData });
        const chartData = result
          .map((item) => ({
            label: `${item.year}-${item.year + 1}`,
            value: item.totalViews,
            name: item.year,
          }))
          .sort((a, b) => a.value - b.value);

        setFullYearData(chartData);
      }
    } catch (error) {
      console.error("Error while fetching statistics", error);
    }
  }
  return (
    <>
      <div className="grid w-full grid-cols-3 gap-2">
        <Card
          count={propertyInfo.totalViews}
          title={dashboardDict.watch}
          Icon={View}
        />
        <Card
          count={propertyInfo.totalShares}
          title={dashboardDict.share}
          Icon={Share}
        />
        <Card
          count={res?.result || 0}
          title={dashboardDict.activeProperties}
          Icon={TotalProperty}
        />
      </div>
      <div className="my-3 flex h-fit w-full space-x-2">
        <div className="my-auto text-xl font-bold">
          <h2>{dashboardDict.allPropertiesViews}</h2>
        </div>
        <div className="my-auto border-spacing-2 border-black">
          <Select
            defaultValue={filtrType}
            onValueChange={async (value) => {
              await handleFilter(value);
              setFiltrType(value);
            }}
          >
            <SelectTrigger className="w-full rounded-md border border-secondary-700 text-base font-medium text-foreground">
              <SelectValue placeholder={filtrType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">{dashboardDict.daily}</SelectItem>
              <SelectItem value="yearly">{dashboardDict.monthly}</SelectItem>
              <SelectItem value="yearly-all">{dashboardDict.yearly}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <h2 className="font-bold capitalize">
        {dashboardDict.statisticsFor}{" "}
        {filtrType === "monthly"
          ? monthList[lang][new Date().getMonth() + 1]
          : filtrType === "yearly-all"
            ? `${fullYearData[0]?.label} ${fullYearData.length > 1 ? `${fullYearData[fullYearData.length - 1]?.label}` : ""}`
            : new Date().getFullYear()}
      </h2>

      <Chart
        chartData={
          filtrType === "monthly"
            ? chartData
            : filtrType === "yearly-all"
              ? fullYearData
              : yearChartData
        }
      />
    </>
  );
}

interface CardProps {
  Icon: FunctionComponent<SVGProps<SVGElement>>;
  title: string;
  count: number;
}

function Card({ Icon, count, title }: CardProps) {
  return (
    <div className="col-span-3 rounded-xl bg-[#423B4E] md:col-span-1">
      <div className="grid grid-cols-3 grid-rows-2">
        <div className="col col-span-2 row-span-2 flex flex-col justify-around ps-3 text-white">
          <h1 className="text-xl md:text-2xl">{title}</h1>
          <span className="ms-2 text-2xl font-bold text-primary-700 md:text-7xl">
            {count}
          </span>
        </div>
        <div className="col-span-1 row-span-1 pe-3 pt-3">
          <Icon className="ml-auto text-yellow-300" />
        </div>
      </div>
    </div>
  );
}
