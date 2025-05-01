"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function SetCaloriesGoalCard() {
  const [caloriesValue, setCaloriesValue] = useState(2000);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Calories Target</CardTitle>
        <CardDescription>Set your daily calories goal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-stretch justify-between">
          <div className="w-20 flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCaloriesValue(caloriesValue - 100);
              }}
            >
              <Minus />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-5xl">{caloriesValue}</div>
            <div className="text-sm text-muted-foreground">Caloreis/Day</div>
          </div>
          <div className="w-20 flex items-center justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setCaloriesValue(caloriesValue + 100);
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <div className="w-full mt-6 flex items-center justify-center">
          <Button className="w-full">Set Goal</Button>
        </div>
      </CardContent>
    </Card>
  );
}
