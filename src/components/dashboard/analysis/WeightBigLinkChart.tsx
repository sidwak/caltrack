"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { useAnalysisPageStore } from "@/stores/dashboard/analysis/useAnalysisPageStore";
import {
  GetWeightForDateRange,
  WeightLog,
} from "@/lib/db/dashboard/WeightQueries";

const chartConfig = {
  weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function WeightBigLineChart() {
  const { refreshKeyDateRange, startDate, endDate } = useAnalysisPageStore();
  const [weightChartData, setWeightChartData] = useState<
    WeightLog[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeightDataForDateRange = async () => {
      const data = await GetWeightForDateRange(startDate, endDate);
      setWeightChartData(data);
    };
    if (startDate !== "" && endDate !== "") {
      fetchWeightDataForDateRange();
    }
  }, [refreshKeyDateRange, startDate, endDate]);

  useEffect(() => {
    if (weightChartData !== undefined) {
      setLoading(false);
    }
  }, [weightChartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Analysis</CardTitle>
        <CardDescription>
          Choose the date range to view the history
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading === false ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={weightChartData}
              margin={{
                top: 10,
                left: 17,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="weight"
                type="natural"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{
                  fill: "var(--chart-1)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center w-full h-[500px] rounded-2xl animate-pulse bg-gray-200 dark:bg-[var(--sidebar-accent)]"></div>
        )}
      </CardContent>
    </Card>
  );
}
