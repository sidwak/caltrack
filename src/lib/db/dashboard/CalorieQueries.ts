import { supabase } from "@/lib/supabaseClient"

export type CaloriesPerDate = {
  date: string // format: 'DD-MM'
  caloriesSum: number
}

export async function GetCaloriesSumForDateRange(
  startDate: string, // format: 'YYYY-MM-DD'
  endDate: string     // format: 'YYYY-MM-DD'
): Promise<CaloriesPerDate[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated")
  }

  // Generate all dates between startDate and endDate (inclusive)
  const dates: { isoDate: string; formattedDate: string }[] = []
  const current = new Date(startDate)
  const end = new Date(endDate)

  while (current <= end) {
    const isoDate = current.toISOString().split("T")[0] // YYYY-MM-DD
    const day = current.getDate().toString().padStart(2, "0")
    const month = (current.getMonth() + 1).toString().padStart(2, "0")
    const formattedDate = `${day}-${month}`

    dates.push({ isoDate, formattedDate })
    current.setDate(current.getDate() + 1)
  }

  // Fetch entries for these dates
  const { data, error } = await supabase
    .from("food_entries")
    .select("entry_date, total_cal")
    .eq("user_id", user.id)
    .in("entry_date", dates.map((d) => d.isoDate))

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
  const result: CaloriesPerDate[] = dates.map(({ isoDate, formattedDate }) => ({
    date: formattedDate,
    caloriesSum: caloriesMap[isoDate] || 0,
  }))

  return result
}
