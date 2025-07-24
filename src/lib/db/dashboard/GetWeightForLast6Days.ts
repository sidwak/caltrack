import { supabase } from "@/lib/supabaseClient";
import { toLocalISOString } from "@/lib/utils";
import { WeightLog } from "./WeightQueries";

export async function GetWeightForLast6Days(): Promise<WeightLog[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  const userId = user.id;

  // Get 6-day date window
  const today = new Date();
  const days: string[] = [];
  const dates: string[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const isoDate = d.toISOString().split("T")[0];
    dates.push(isoDate);
    days.push(d.toLocaleDateString("en-US", { weekday: "short" }));
  }
  // Fetch weight_logs within that range
  const { data, error } = await supabase
    .from("weight_logs")
    .select("weight, inserted_at")
    .eq("user_id", userId)
    .gte("inserted_at", `${dates[0]}T00:00:00`)
    .lte("inserted_at", `${dates[5]}T23:59:59`);

  if (error) throw new Error("Failed to fetch weight logs");

  // Map logs by date (only first weight of the day counts)
  const weightByDate: Record<string, number> = {};
  for (const entry of data || []) {
    const dateKey = toLocalISOString(new Date(entry.inserted_at)).split("T")[0];
    if (!(dateKey in weightByDate)) {
      weightByDate[dateKey] = Number(entry.weight) || 0;
    }
  }

  // Assemble final array
  return dates.map((date, idx) => ({
    day: days[idx],
    weight: weightByDate[date] ?? 0,
  }));
}
