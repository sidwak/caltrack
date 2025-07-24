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
  const daysOffset = (segment - 1) * 5;
  let firstQueryOffset = 0
  if (segment > 1){
    firstQueryOffset = 1
  }

  const start = subDays(today, daysOffset + 5)
  //start.setDate(subDays(start, 30)); // go back to earliest date in range

  const end = addDays(start, 5 - firstQueryOffset)
  useHistoryPageStore.getState().setEndDate(end)
  //end.setDate(end.getDate() - daysOffset); // latest date in range

  const { data, error } = await supabase   
    .from("food_entries")
    .select("*")
    .eq("user_id", user.id)
    .gte("entry_date", toLocalISOString(start).split("T")[0])
    .lte("entry_date", toLocalISOString(end).split("T")[0])
    .order("entry_date", { ascending: false });

  if (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }

  return data;
}
