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
import { DatePicker } from "../history/DatePicker";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "../history/DatePickerWithRange";
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
  const { refreshKeyTodaysFood } = useFoodInsertStore();

  const [caloriesHistoryData, setCaloriesHistoryData] = useState<
    CaloriesPerDay[]
  >([]);

  useEffect(() => {
    const fetchLast6DaysCaloriesData = async () => {
      const data = await GetCaloriesSumForLast6Days();
      setCaloriesHistoryData(data);
    };
    fetchLast6DaysCaloriesData();
  }, [refreshKeyTodaysFood]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calorie Analysis</CardTitle>
        <CardDescription>
          Choose the date range to view the history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--chart-1)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
