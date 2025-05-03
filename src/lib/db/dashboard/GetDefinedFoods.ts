import { supabase } from '@/lib/supabaseClient'
import { DefinedFood} from '@/types/food'

export async function GetDefinedFoods(): Promise<DefinedFood[]> {
  const { data, error } = await supabase
    .from('foods')
    .select('*')

  if (error) {
    console.error('Error fetching foods:', error.message)
    return []
  }

  return data ?? []
}
