import { supabase } from "@/lib/supabaseClient"

export type CaloriesPerDay = {
  day: string // e.g., 'Mon', 'Tue'
  Calories: number
}

export async function GetCaloriesSumForLast6Days(): Promise<CaloriesPerDay[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Generate last 6 dates including today
  const dates: { date: string; day: string }[] = []
  const today = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().split("T")[0] // YYYY-MM-DD
    const day = d.toLocaleDateString("en-US", { weekday: "short" })// 'Mon', 'Tue'
    dates.push({ date: dateStr, day })
  }

  // Fetch entries for these dates
  const { data, error } = await supabase
    .from("food_entries")
    .select("entry_date, total_cal")
    .eq("user_id", user.id)
    .in("entry_date", dates.map((d) => d.date))

  if (error) {
    throw new Error("Failed to fetch food entries: " + error.message)
  }

  // Group calories by entry_date
  const caloriesMap: Record<string, number> = {}
  data.forEach((entry) => {
    if (!caloriesMap[entry.entry_date]) {
      caloriesMap[entry.entry_date] = 0
    }
    caloriesMap[entry.entry_date] += entry.total_cal
  })

  // Build final result
  const result: CaloriesPerDay[] = dates.map(({ date, day }) => ({
    day,
    Calories: caloriesMap[date] || 0,
  }))

  return result
}
