"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  GetWeightForLast6Days,
  WeightLog,
} from "@/lib/db/dashboard/GetWeightForLast6Days";
import { useWeightInsertStore } from "@/stores/dashboard/useWeightInsertStore";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WeightLineChart() {
  const { refreshKeyTodaysWeight } = useWeightInsertStore();

  const [weightHistoryData, setWeightHistoryData] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeightForLast6Days = async () => {
      const data = await GetWeightForLast6Days();
      console.log(data);
      setWeightHistoryData(data);
      setLoading(false);
    };
    fetchWeightForLast6Days();
  }, [refreshKeyTodaysWeight]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight History</CardTitle>
        <CardDescription>Your weight since last 6 days</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-end h-full">
        {loading === false ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={weightHistoryData}
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
          <div className="flex items-center justify-center w-full h-[200px] rounded-2xl animate-pulse bg-gray-200 dark:bg-[var(--sidebar-accent)]"></div>
        )}
      </CardContent>
    </Card>
  );
}
