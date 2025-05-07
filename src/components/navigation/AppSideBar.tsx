"use client";

import { ChartArea, Home, Search, Settings, History } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: History,
  },
  {
    title: "Analysis",
    url: "/dashboard/analysis",
    icon: ChartArea,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

type DashboardRoute =
  | "Home"
  | "History"
  | "Analysis"
  | "Search"
  | "Settings"
  | null;

const validRoutes: Record<string, DashboardRoute> = {
  dashboard: "Home",
  "dashboard/history": "History",
  "dashboard/analysis": "Analysis",
  "dashboard/search": "Search",
  "dashboard/settings": "Settings",
};

export function AppSidebar() {
  const pathname = usePathname();
  const [currentDashboardRoute, setCurrentDashboardRoute] =
    useState<DashboardRoute>(null);

  useEffect(() => {
    if (!pathname) return;

    const cleanedPath = pathname.replace(/^\/|\/$/g, ""); // removes leading/trailing slashes
    const routeKey =
      cleanedPath === "dashboard"
        ? "dashboard"
        : cleanedPath.startsWith("dashboard/")
        ? cleanedPath
        : "";

    if (routeKey && validRoutes[routeKey]) {
      setCurrentDashboardRoute(validRoutes[routeKey]);
      console.log(validRoutes[routeKey]);
    } else {
      setCurrentDashboardRoute(null);
    }
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Caltrack</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`py-1 px-2 ${
                      currentDashboardRoute === item.title
                        ? "bg-[var(--sidebar-primary)]"
                        : ""
                    }`}
                  >
                    {/* <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a> */}
                    <Link href={item.url} className="font-semibold">
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
