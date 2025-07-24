"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GetUserCaloriesTarget,
  UpdateUserProfileData,
} from "@/lib/db/dashboard/settings/ProfileDataQueries";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function SetCaloriesGoalCard() {
  const [caloriesValue, setCaloriesValue] = useState(2000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserCalorieTarget = async () => {
      const value = await GetUserCaloriesTarget();
      setCaloriesValue(value.calorie_target);
    };
    fetchUserCalorieTarget();
  });

  const handleUpdateDataClick = async () => {
    try {
      setLoading(true);
      await UpdateUserProfileData({ calorie_target: caloriesValue });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mt-6">
          <Button
            className="w-full"
            disabled={loading}
            onClick={handleUpdateDataClick}
          >
            {loading ? "Updating..." : "Set Goal"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
