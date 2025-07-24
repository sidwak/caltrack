"use client"; // this is only for useStore

import AddPastFoodCard from "@/components/dashboard/history/AddPastFoodCard";
import AddPastWeightCard from "@/components/dashboard/history/AddPastWeightCard";
import FoodHistoryDataTable from "@/components/dashboard/history/FoodHistoryDataTable";
import { Label } from "@/components/ui/label";
import { useHistoryPageStore } from "@/stores/dashboard/history/useHistoryPageStore";

export default function HistoryPage() {
  const { startDate, endDate } = useHistoryPageStore();

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="autofill-grid gap-6">
        <AddPastFoodCard />
        <AddPastWeightCard />
      </div>
      <p className="text-2xl font-bold">Food History</p>
      <Label className="text-muted-foreground">
        Period: {startDate.toDateString()} - {endDate.toDateString()}
      </Label>
      <FoodHistoryDataTable />
    </div>
  );
}
