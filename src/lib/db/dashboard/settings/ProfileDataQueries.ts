import { supabase } from "@/lib/supabaseClient";

export type ProfileDataType = {
  id?: string;
  display_name?: string;
  age?: number;
  weight_kg?: number;
  gender?: string;
  goal_weight?: number;
  calorie_target?: number;
  created_at?: string;
  email?: string;
};

export type WeightLog = {
  id: string;
  user_id: string;
  weight: number;
  logged_at: string;
  inserted_at: string;
};

export const GetUserProfileData = async () => {
  // Get current authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No user logged in");

  // Fetch user profile from 'profiles' table using user.id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single(); // assuming one profile per user

  if (profileError) throw profileError;

  return { ...profile, email: user.email };
};

export const UpdateUserProfileData = async (updates: ProfileDataType) => {
  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No user logged in");

  // Update the profile by matching on user ID
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      ...updates,
      id: user.id, // include ID to satisfy upsert/update
    })
    .eq("id", user.id);

  if (updateError) throw updateError;

  return true;
};

export const GetUserCaloriesTarget = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No user logged in");

  const { data, error: updateError } = await supabase
    .from("profiles")
    .select("calorie_target")
    .eq("id", user.id)
    .single();

  if (updateError) throw updateError;

  return data;
};

export const GetUserGoalWeight = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No user logged in");

  const { data, error } = await supabase
    .from("profiles")
    .select("goal_weight")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error("Failed to fetch food entries: " + error.message);
  }

  return data;
};

export const GetUserLatestWeightLog = async (): Promise<WeightLog | null> => {
  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("No user logged in");

  // Fetch the latest weight log for this user
  const { data, error } = await supabase
    .from("weight_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("inserted_at", { ascending: false })
    .limit(1)
    .single(); // Expecting one record

  if (error) {
    if (error.code === "PGRST116") return null; // no rows found
    throw error;
  }

  return data;
};
