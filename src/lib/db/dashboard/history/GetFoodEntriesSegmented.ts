import { supabase } from "@/lib/supabaseClient";

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

  const start = new Date(today);
  start.setDate(start.getDate() - daysOffset - 4); // go back to earliest date in range

  const end = new Date(today);
  end.setDate(end.getDate() - daysOffset); // latest date in range

  const { data, error } = await supabase
    .from("food_entries")
    .select("*")
    .eq("user_id", user.id)
    .gte("entry_date", start.toISOString().split("T")[0])
    .lte("entry_date", end.toISOString().split("T")[0])
    .order("entry_date", { ascending: false });

  if (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }

  return data;
}
