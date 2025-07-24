"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { InsertOrUpdateTodaysWeight } from "@/lib/db/dashboard/InsertOrUpdateTodaysWeight";
import { useWeightInsertStore } from "@/stores/dashboard/useWeightInsertStore";
import { useEffect, useState } from "react";

export default function AddWeightCard() {
  const { triggerRefreshTodaysWeight } = useWeightInsertStore();

  const [weightValue, setWeightValue] = useState(0);
  const [timeValue, setTimeValue] = useState<
    "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT"
  >("MORNING");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(timeValue);
  }, [timeValue]);

  const handleLogWeightClick = async () => {
    if (weightValue === 0) {
      alert("weight cannot be 0");
      return;
    }
    try {
      setLoading(true);
      const result = await InsertOrUpdateTodaysWeight(
        weightValue,
        timeValue,
        new Date()
      );
      console.log(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      triggerRefreshTodaysWeight();
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Todays Weight</CardTitle>
        <CardDescription>Input the todays weight</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="grow grid gap-2">
            <Label htmlFor="weightInput">Weight (kg)</Label>
            <Input
              id="weightInput"
              type="number"
              placeholder="10.0"
              value={weightValue}
              onChange={(e) => setWeightValue(Number(e.target.value))}
              required
            />
          </div>
          <div className="grow grid gap-2">
            <Label htmlFor="timeInput">Time</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              id="timeInput"
              className="w-full overflow-x-auto"
              value={timeValue}
              onValueChange={(
                e: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT"
              ) => setTimeValue(e)}
            >
              <ToggleGroupItem value="MORNING" aria-label="Toggle bold">
                <p>Morning</p>
              </ToggleGroupItem>
              <ToggleGroupItem value="AFTERNOON" aria-label="Toggle italic">
                <p>Afternoon</p>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="EVENING"
                aria-label="Toggle strikethrough"
              >
                <p>Evening</p>
              </ToggleGroupItem>
              <ToggleGroupItem value="NIGHT" aria-label="Toggle italic">
                <p>Night</p>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="flex w-full mt-4 items-center justify-center">
          <Button
            variant="default"
            size="lg"
            disabled={loading}
            onClick={handleLogWeightClick}
            className="w-full"
          >
            {loading ? "Logging..." : "Measure Weight"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
