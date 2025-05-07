import { CaloriesBigBarChart } from "@/components/dashboard/analysis/CaloriesBigBarChart";
import { WeightBigLineChart } from "@/components/dashboard/analysis/WeightBigLinkChart";
import { DatePickerWithRange } from "@/components/dashboard/history/DatePickerWithRange";
import { Label } from "@/components/ui/label";

export default function AnalysisPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6 mx-64">
        <div className="grow grid gap-2 w-1/2">
          <Label>Date Range</Label>
          <DatePickerWithRange />
        </div>
        <CaloriesBigBarChart />
        <WeightBigLineChart />
      </div>
    </div>
  );
}
