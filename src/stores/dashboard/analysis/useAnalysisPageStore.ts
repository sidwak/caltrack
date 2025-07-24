import { create } from "zustand"

type AnalysisPageStore = {
  startDate: string
  endDate: string
  refreshKeyDateRange: number
  triggerRefreshDateRange: () => void
  setRStartDate: (newStartDate: string) => void
  setREndDate: (newEndDate: string) => void 
}

export const useAnalysisPageStore = create<AnalysisPageStore>((set) => ({
  startDate: "",
  endDate: "",
  refreshKeyDateRange: 0,
  triggerRefreshDateRange: () =>
    set((state) => ({ refreshKeyDateRange: state.refreshKeyDateRange + 1 })),
  setRStartDate: (newStartDate: string) => set((state) => ({startDate: newStartDate})),
  setREndDate: (newEndDate: string) => set((state) => ({endDate: newEndDate}))
}))
