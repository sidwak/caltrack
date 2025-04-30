import { create } from "zustand"

type FoodInsertStore = {
  refreshKeyTodaysFood: number
  triggerRefreshTodaysFoodCard: () => void
}

export const useFoodInsertStore = create<FoodInsertStore>((set) => ({
  refreshKeyTodaysFood: 0,
  triggerRefreshTodaysFoodCard: () =>
    set((state) => ({ refreshKeyTodaysFood: state.refreshKeyTodaysFood + 1 })),
}))
