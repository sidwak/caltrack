import { create } from "zustand"

type WeightInsertStore = {
  refreshKeyTodaysWeight: number
  triggerRefreshTodaysWeight: () => void
}

export const useWeightInsertStore = create<WeightInsertStore>((set) => ({
  refreshKeyTodaysWeight: 0,
  triggerRefreshTodaysWeight: () =>
    set((state) => ({ refreshKeyTodaysWeight: state.refreshKeyTodaysWeight + 1 })),
}))
