import { supabase } from "@/lib/supabaseClient";
import { toLocalISOString } from "@/lib/utils";

export async function InsertOrUpdateTodaysWeight(
  weight: number,
  loggedAt: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT",
  date?: Date
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const userId = user.id;
  let today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  if (date !== null) {
    today = toLocalISOString(date!).split("T")[0];
  }

  const { data: existing, error: fetchError } = await supabase
    .from("weight_logs")
    .select("id")
    .eq("user_id", userId)
    .gte("inserted_at", `${today}T00:00:00`)
    .lte("inserted_at", `${today}T23:59:59`)
    .maybeSingle();

  if (fetchError) throw new Error("Failed to check existing weight log");

  let insertDate = new Date().toISOString();
  if (date !== null) {
    insertDate = toLocalISOString(date!) as string;
  }
  if (existing) {
    // 🔁 Update the existing entry
    const { error: updateError } = await supabase
      .from("weight_logs")
      .update({ weight: weight, logged_at: loggedAt, inserted_at: insertDate })
      .eq("id", existing.id);

    if (updateError) throw new Error("Failed to update weight log");
  } else {
    // 🆕 Insert a new row
    const { error: insertError } = await supabase.from("weight_logs").insert({
      user_id: userId,
      weight: weight,
      logged_at: loggedAt,
      inserted_at: insertDate,
    });

    if (insertError) throw new Error("Failed to insert weight log");
  }
  return "insert or update successful for weight log";
}
