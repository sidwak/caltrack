import { AppSidebar } from "@/components/navigation/AppSideBar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardHeaderTitle } from "@/components/dashboard/DashboardHeaderTitle";
import { LogoutButton } from "@/components/navigation/LogoutButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="h-full flex flex-col">
          <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex w-full justify-between">
                <DashboardHeaderTitle />
                <LogoutButton />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
