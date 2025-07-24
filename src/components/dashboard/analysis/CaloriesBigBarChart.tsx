"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { GetCaloriesSumForLast6Days } from "@/lib/db/dashboard/GetCaloriesSumForLast6Days";
import { useFoodInsertStore } from "@/stores/dashboard/useFoodInsertStore";
import { DatePicker } from "../history/DatePicker";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { useAnalysisPageStore } from "@/stores/dashboard/analysis/useAnalysisPageStore";
import {
  CaloriesPerDate,
  GetCaloriesSumForDateRange,
} from "@/lib/db/dashboard/CalorieQueries";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CaloriesBigBarChart() {
  const { refreshKeyDateRange, startDate, endDate } = useAnalysisPageStore();
  const [barchartData, setBarchartData] = useState<
    CaloriesPerDate[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaloriesDataForDateRange = async () => {
      const data = await GetCaloriesSumForDateRange(startDate, endDate);
      setBarchartData(data);
    };
    if (startDate !== "" && endDate !== "") {
      fetchCaloriesDataForDateRange();
    }
  }, [refreshKeyDateRange]);

  useEffect(() => {
    if (barchartData !== undefined) {
      setLoading(false);
    }
  }, [barchartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calorie Analysis</CardTitle>
        <CardDescription>
          Choose the date range to view the history
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading === false ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={barchartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="caloriesSum" fill="var(--chart-1)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center w-full h-[500px] rounded-2xl animate-pulse bg-gray-200 dark:bg-[var(--sidebar-accent)]"></div>
        )}
      </CardContent>
    </Card>
  );
}
