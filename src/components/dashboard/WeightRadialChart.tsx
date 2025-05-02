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
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import {
  GetUserGoalWeight,
  GetUserLatestWeightLog,
} from "@/lib/db/dashboard/settings/ProfileDataQueries";
const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--chart-1)" },
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

export function WeightRadialChart() {
  const [userGoalWeight, setUserGoalWeight] = useState(60);
  const [userLatestWeight, setUserLatestWeight] = useState(0);

  useEffect(() => {
    const fetchUserCalorieTarget = async () => {
      const value = await GetUserGoalWeight();
      console.log(value.goal_weight);
      setUserGoalWeight(value.goal_weight);
    };
    fetchUserCalorieTarget();
    GetUserLatestWeightLog()
      .then((log) => {
        if (log) setUserLatestWeight(log.weight);
        else setUserLatestWeight(0);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weight Goal</CardTitle>
        <CardDescription>Track your weight goal</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[183px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(userLatestWeight / userGoalWeight) * 360}
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
            <RadialBar dataKey="visitors" background cornerRadius={10} />
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
                          {userLatestWeight}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {userGoalWeight - userLatestWeight} KGs Left
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
