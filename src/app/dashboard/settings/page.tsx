import ProfileSettingsCard from "@/components/dashboard/settings/ProfileSettingsCard";
import SetCaloriesGoalCard from "@/components/dashboard/settings/SetCaloriesGoalCard";
import SetWeightGoalCard from "@/components/dashboard/settings/SetWeightGoalCard";

export default function SettingsPage() {
  return (
    <div className="flex gap-6 p-6 w-full justify-center">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SetCaloriesGoalCard />
          <SetWeightGoalCard />
        </div>
        <div className="col-span-2">
          <ProfileSettingsCard />
        </div>
      </div>
    </div>
  );
}
