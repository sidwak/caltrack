import { create } from "zustand"

type HistoryPageStore = {
  startDate: Date
  endDate: Date
  setStartDate: (newStartDate: Date) => void
  setEndDate: (newEndDate: Date) => void
}

export const useHistoryPageStore = create<HistoryPageStore>((set) => ({
  startDate: new Date(),
  endDate: new Date(),
  setStartDate: (newStartDate: Date) => set(() => ({startDate: newStartDate})),
  setEndDate: (newEndDate: Date) => set(() => ({endDate: newEndDate}))
}))
