import { supabase } from "@/lib/supabaseClient"

export async function GetCaloriesSumForToday(): Promise<number> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  const today = new Date().toISOString().split("T")[0] // format: YYYY-MM-DD

  const { data, error } = await supabase
    .from("food_entries")
    .select("total_cal")
    .eq("user_id", user.id)
    .eq("entry_date", today)

  if (error) {
    throw new Error("Failed to fetch entries: " + error.message)
  }

  const totalCalories = data?.reduce((sum, entry) => sum + (entry.total_cal || 0), 0) || 0

  return totalCalories
}
