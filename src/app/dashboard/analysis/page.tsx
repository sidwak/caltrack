import { CaloriesBigBarChart } from "@/components/dashboard/analysis/CaloriesBigBarChart";
import { WeightBigLineChart } from "@/components/dashboard/analysis/WeightBigLinkChart";
import { DatePickerWithRange } from "@/components/dashboard/history/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AnalysisPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="w-2/3">
          <div className="flex gap-3 w-fit items-end mb-6">
            <div className="grow grid gap-2 w-1/4">
              <Label>Date Range</Label>
              <DatePickerWithRange />
            </div>
            <Button>View</Button>
          </div>
          <CaloriesBigBarChart />
        </div>
        <div className="w-2/3">
          <WeightBigLineChart />
        </div>
      </div>
    </div>
  );
}
