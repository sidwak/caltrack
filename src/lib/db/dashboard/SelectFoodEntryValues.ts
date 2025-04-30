import { supabase } from "@/lib/supabaseClient"

export async function SelectFoodEntryValues() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("food_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false })

  if (error) {
    throw new Error("Failed to fetch food entries: " + error.message)
  }

  return data
}
