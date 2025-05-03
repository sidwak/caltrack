import AddPastFoodCard from "@/components/dashboard/history/AddPastFoodCard";
import AddPastWeightCard from "@/components/dashboard/history/AddPastWeightCard";
import FoodHistoryDataTable from "@/components/dashboard/history/FoodHistoryDataTable";

export default function HistoryPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="responsive-grid-cols gap-6">
        <AddPastFoodCard />
        <AddPastWeightCard />
      </div>
      <p className="text-2xl font-bold">Food History</p>
      <FoodHistoryDataTable />
    </div>
  );
}
