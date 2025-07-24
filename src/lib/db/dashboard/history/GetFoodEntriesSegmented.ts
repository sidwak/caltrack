import { supabase } from "@/lib/supabaseClient";
import { toLocalISOString } from "@/lib/utils";
import { useHistoryPageStore } from "@/stores/dashboard/history/useHistoryPageStore";
import { addDays, subDays } from "date-fns";

/**
 * Fetch food_entries for a segment of days (5 days per segment)
 * @param userId - UUID of the user
 * @param segment - 1 for latest 5 days, 2 for previous 5, etc.
 */
export async function GetFoodEntriesSegmented(segment: number) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of day

  const endDayOffset = (segment - 1) * 5;
  const startDayOffset = (segment * 5) - 1;

  const endDate = subDays(today, endDayOffset);
  const startDate = subDays(today, startDayOffset);

  // Set time to end of day for endDate and start of day for startDate for accurate range
  endDate.setHours(23, 59, 59, 999);
  startDate.setHours(0, 0, 0, 0);

  useHistoryPageStore.getState().setEndDate(endDate);

  const { data, error } = await supabase   
    .from("food_entries")
    .select("*")
    .eq("user_id", user.id)
    .gte("entry_date", toLocalISOString(startDate).split("T")[0])
    .lte("entry_date", toLocalISOString(endDate).split("T")[0])
    .order("entry_date", { ascending: false });

  if (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }

  return data;
}
