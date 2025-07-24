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
  GetUserGoalWeight,
  UpdateUserProfileData,
} from "@/lib/db/dashboard/settings/ProfileDataQueries";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function SetWeightGoalCard() {
  const [weightValue, setWeightValue] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserGoalWeight = async () => {
      const value = await GetUserGoalWeight();
      setWeightValue(value.goal_weight);
    };
    fetchUserGoalWeight();
  });

  const handleUpdateDataClick = async () => {
    try {
      setLoading(true);
      await UpdateUserProfileData({ goal_weight: weightValue });
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
        <CardTitle>Weight Target</CardTitle>
        <CardDescription>Set your weight goal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-stretch justify-between">
          <div className="w-20 flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setWeightValue(weightValue - 1);
              }}
            >
              <Minus />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-5xl">{weightValue}</div>
            <div className="text-sm text-muted-foreground">KG</div>
          </div>
          <div className="w-20 flex items-center justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setWeightValue(weightValue + 1);
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
