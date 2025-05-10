import { CaloriesBigBarChart } from "@/components/dashboard/analysis/CaloriesBigBarChart";
import { WeightBigLineChart } from "@/components/dashboard/analysis/WeightBigLinkChart";
import { DatePickerWithRange } from "@/components/dashboard/history/DatePickerWithRange";
import { Label } from "@/components/ui/label";

export default function AnalysisPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="grow grid gap-2 w-1/6">
          <Label>Date Range</Label>
          <DatePickerWithRange />
        </div>
        <div className="w-2/3">
          <CaloriesBigBarChart />
        </div>
        <div className="w-2/3">
          <WeightBigLineChart />
        </div>
      </div>
    </div>
  );
}
