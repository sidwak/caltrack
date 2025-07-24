import AddFoodCard from "@/components/dashboard/AddFoodCard";
import AddWeightCard from "@/components/dashboard/AddWeightCard";
import { CaloriesBarChart } from "@/components/dashboard/CaloriesBarChart";
import { CaloriesRadialChart } from "@/components/dashboard/CaloriesRadialChart";
import TodaysFoodCard from "@/components/dashboard/TodaysFoodCard";
import { WeightLineChart } from "@/components/dashboard/WeightLineChart";
import { WeightRadialChart } from "@/components/dashboard/WeightRadialChart";

export default function DashboardPage() {
  return (
    <div>
      <div className="autofill-grid gap-6 p-6">
        <TodaysFoodCard />
        <AddFoodCard />
        <CaloriesRadialChart />
        <CaloriesBarChart />
        <AddWeightCard />
        <WeightLineChart />
        <WeightRadialChart />
      </div>
    </div>
  );
}
