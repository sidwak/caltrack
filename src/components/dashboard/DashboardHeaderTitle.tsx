"use client";

import { useDashboardRouteStore } from "@/stores/dashboard/useDashboardRouteStore";

export function DashboardHeaderTitle() {
  const { currentDashboardRoute } = useDashboardRouteStore();

  return (
    <h1 className="text-xl font-medium">
      {currentDashboardRoute || "Dashboard"}
    </h1>
  );
}
