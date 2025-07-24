import { supabase } from "@/lib/supabaseClient";
import { toLocalISOString } from "@/lib/utils";

export type WeightLog = {
  day: string;
  weight: number;
};

export async function GetWeightForDateRange(
  startDate: string,
  endDate: string
): Promise<WeightLog[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  const userId = user.id;

  const { data, error } = await supabase
    .from("weight_logs")
    .select("weight, inserted_at")
    .eq("user_id", userId)
    .gte("inserted_at", `${startDate}T00:00:00`)
    .lte("inserted_at", `${endDate}T23:59:59`);

  if (error) throw new Error("Failed to fetch weight logs");

  const weightByDate: Record<string, number> = {};
  for (const entry of data || []) {
    const dateKey = toLocalISOString(new Date(entry.inserted_at)).split("T")[0];
    if (!(dateKey in weightByDate)) {
      weightByDate[dateKey] = Number(entry.weight) || 0;
    }
  }

  const dates: string[] = [];
  const days: string[] = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const isoDate = currentDate.toISOString().split("T")[0];
    dates.push(isoDate);
    days.push(currentDate.toLocaleDateString("en-US", { weekday: "short" }));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates.map((date, idx) => ({
    day: days[idx],
    weight: weightByDate[date] ?? 0,
  }));
}
