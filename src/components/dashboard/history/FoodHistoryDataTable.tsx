"use client";

import { GetFoodEntriesSegmented } from "@/lib/db/dashboard/history/GetFoodEntriesSegmented";
import { useEffect, useState } from "react";
import FoodHistoryTable from "./FoodHistoryTable";

export default function FoodHistoryDataTable() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchFoodEntriesSegmented = async () => {
      const data = await GetFoodEntriesSegmented(1);
      setHistoryData(data);
    };
    fetchFoodEntriesSegmented();
  }, []);

  return (
    <div className="m-6 rounded-2xl border-2">
      <FoodHistoryTable entries={historyData} />
    </div>
  );
}
