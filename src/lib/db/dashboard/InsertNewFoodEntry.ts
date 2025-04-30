import { supabase } from "@/lib/supabaseClient"

export async function InsertNewFoodEntry({
  food_name,
  total_cal,
  quantity,
  entry_date, // Should be a string in 'YYYY-MM-DD' format
}: {
  food_name: string
  total_cal: number
  quantity: string
  entry_date: string
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  const { error, data } = await supabase.from("food_entries").insert([
    {
      user_id: user.id,
      food_name: food_name,
      total_cal: total_cal,
      quantity: quantity,
      entry_date: entry_date, // e.g. '2025-04-30'
    },
  ])

  if (error) {
    throw new Error("Failed to insert food entry: " + error.message)
  }

  return data
}
