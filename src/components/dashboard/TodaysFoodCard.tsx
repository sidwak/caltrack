"use client";

import { useEffect, useState } from "react";
import { SelectFoodEntryValues } from "@/lib/db/dashboard/SelectFoodEntryValues";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFoodInsertStore } from "@/stores/dashboard/useFoodInsertStore";

type FoodEntry = {
  id: string;
  food_name: string;
  quantity: number;
  total_cal: number;
  entry_date: string;
};

export default function TodaysFoodCard() {
  const { refreshKeyTodaysFood } = useFoodInsertStore();

  const [foodItems, setFoodItems] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await SelectFoodEntryValues();

        // Optional: filter for today's entries only
        const today = new Date().toISOString().split("T")[0];
        const todayEntries = data.filter(
          (item: FoodEntry) => item.entry_date === today
        );

        setFoodItems(todayEntries);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [refreshKeyTodaysFood]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Items</CardTitle>
        <CardDescription>Food you’ve eaten today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 h-[183px] overflow-y-auto">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-[var(--sidebar-accent)] h-[56px] rounded-lg"
              />
            ))
          ) : foodItems.length > 0 ? (
            foodItems.map((item) => (
              <div
                key={item.id}
                className="flex border rounded-lg py-2 px-4 text-sm text-gray-500"
              >
                <div className="grow">
                  <p>{item.food_name}</p>
                  <p className="text-xs text-gray-400">{item.quantity}</p>
                </div>
                <div className="text-right font-medium">
                  {item.total_cal} kcal
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No foods eaten today</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
