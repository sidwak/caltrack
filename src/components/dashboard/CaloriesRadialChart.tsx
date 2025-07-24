"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

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
import { GetCaloriesSumForToday } from "@/lib/db/dashboard/GetCaloriesSumForToday";
import { useFoodInsertStore } from "@/stores/dashboard/useFoodInsertStore";
import { GetUserCaloriesTarget } from "@/lib/db/dashboard/settings/ProfileDataQueries";
const chartData = [
  { browser: "safari", visitors: 400, fill: "var(--chart-1)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CaloriesRadialChart() {
  const [caloriesSum, setCaloriesSum] = useState(0);
  const [caloriesTarget, setCaloriesTarget] = useState(0);
  const { refreshKeyTodaysFood } = useFoodInsertStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodaysCaloriesSum = async () => {
      const totalCalories = await GetCaloriesSumForToday();
      setCaloriesSum(totalCalories);
    };
    fetchTodaysCaloriesSum();
  }, [refreshKeyTodaysFood]);

  useEffect(() => {
    const fetchUserCalorieTarget = async () => {
      const value = await GetUserCaloriesTarget();
      setCaloriesTarget(value.calorie_target);
    };
    fetchUserCalorieTarget();
  }, []);

  useEffect(() => {
    if (caloriesTarget !== 0) {
      setLoading(false);
    }
  }, [caloriesSum, caloriesTarget]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Todays Goal</CardTitle>
        <CardDescription>Your calories progress today</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading === false ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[184px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={(caloriesSum / caloriesTarget) * 360}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" cornerRadius={10} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {caloriesTarget - caloriesSum}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Remaining
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-2xl animate-pulse bg-gray-200 dark:bg-[var(--sidebar-accent)]"></div>
        )}
      </CardContent>
    </Card>
  );
}
