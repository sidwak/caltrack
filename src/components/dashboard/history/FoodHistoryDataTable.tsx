"use client";

import { GetFoodEntriesSegmented } from "@/lib/db/dashboard/history/GetFoodEntriesSegmented";
import { useEffect, useState } from "react";
import FoodHistoryTable from "./FoodHistoryTable";
import { Button } from "@/components/ui/button";

export default function FoodHistoryDataTable() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loadCounter, setLoadCounter] = useState(1);

  useEffect(() => {
    const fetchFoodEntriesSegmented = async () => {
      const data = await GetFoodEntriesSegmented(loadCounter);
      setHistoryData((prevData) => {
        const existingIds = new Set(prevData.map(entry => entry.id));
        const uniqueNewData = data.filter(entry => !existingIds.has(entry.id));
        return [...prevData, ...uniqueNewData];
      });
      console.log(data);
    };
    fetchFoodEntriesSegmented();
  }, [loadCounter]);

  return (
    <div className="rounded-2xl border-2">
      <FoodHistoryTable entries={historyData} />
      <div className="w-full my-3 flex justify-center">
        <Button onClick={() => setLoadCounter(loadCounter + 1)}>
          Load More
        </Button>
      </div>
    </div>
  );
}
