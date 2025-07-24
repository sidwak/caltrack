import { create } from 'zustand';

type DashboardRoute =
  | "Home"
  | "History"
  | "Analysis"
  | "Calhelp"
  | "Settings"
  | null;

interface DashboardRouteState {
  currentDashboardRoute: DashboardRoute;
  setCurrentDashboardRoute: (route: DashboardRoute) => void;
}

export const useDashboardRouteStore = create<DashboardRouteState>((set) => ({
  currentDashboardRoute: null,
  setCurrentDashboardRoute: (route) => set({ currentDashboardRoute: route }),
}));
