"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "views",
    color: "#8859FF",
  },
} satisfies ChartConfig;

export function Chart({
  chartData,
}: {
  chartData: {
    label: string;
    value: number;
    name: number | string;
  }[];
}) {
  chartData.sort((a, b) => {
    return Number(a.name) - Number(b.name);
  });

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: any, i) => {
            return chartData[i].name.toString();
          }}
        />
        <ChartTooltip
          content={<ChartTooltipContent className="w-[150px] text-white" />}
        />
        <Bar dataKey="value" fill="var(--color-views)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
