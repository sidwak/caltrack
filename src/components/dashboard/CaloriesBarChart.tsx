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
import {
  CaloriesPerDay,
  GetCaloriesSumForLast6Days,
} from "@/lib/db/dashboard/GetCaloriesSumForLast6Days";
import { useFoodInsertStore } from "@/stores/dashboard/useFoodInsertStore";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
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

export function CaloriesBarChart() {
  const { refreshKeyTodaysFood } = useFoodInsertStore();

  const [caloriesHistoryData, setCaloriesHistoryData] = useState<
    CaloriesPerDay[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLast6DaysCaloriesData = async () => {
      const data = await GetCaloriesSumForLast6Days();
      setCaloriesHistoryData(data);
      setLoading(false);
    };
    fetchLast6DaysCaloriesData();
  }, [refreshKeyTodaysFood]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-end h-full">
        {loading === false ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={caloriesHistoryData}
              margin={{
                top: 25,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="Calories" fill="var(--chart-1)" radius={8}>
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
          <div className="flex items-center justify-center w-full h-[200px] rounded-2xl animate-pulse bg-gray-200 dark:bg-[var(--sidebar-accent)]"></div>
        )}
      </CardContent>
    </Card>
  );
}
