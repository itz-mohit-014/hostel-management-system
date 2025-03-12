"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BedDouble,
  CalendarCheck,
  FileText,
  Home,
  LayoutDashboard,
  LogOutIcon,
  MessageSquare,
  Settings,
  User,
  Users,
  Wallet,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Profile",
      icon: User,
      href: "/dashboard/profile",
      variant: "default",
    },
    {
      title: "Room Allocation",
      icon: BedDouble,
      href: "/dashboard/room-allocation",
      variant: "default",
    },
    {
      title: "Fee Details",
      icon: Wallet,
      href: "/dashboard/fee-details",
      variant: "default",
    },
    {
      title: "Attendance",
      icon: CalendarCheck,
      href: "/dashboard/attendance",
      variant: "default",
    },
    {
      title: "Leave Form",
      icon: FileText,
      href: "/dashboard/leave-form",
      variant: "default",
    },
    {
      title: "Complaints",
      icon: MessageSquare,
      href: "/dashboard/complaints",
      variant: "default",
    },
    {
      title: "Gate Pass",
      icon: Users,
      href: "/dashboard/gate-pass",
      variant: "default",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      variant: "default",
    },
  ];

  const { state } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className={state === "expanded" ? "flex items-center gap-2 px-2" : ""}
        >
          <div className="flex h-8 w-8 items-center shrink-0   justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          {state === "expanded" && (
            <div
              className={`font-semibold overflow-hidden transition-all duration-300 delay-300 text-nowrap ${
                state === "expanded"
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0"
              }`}
            >
              {" "}
              Hostel Management
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === route.href}
                    tooltip={route.title}
                  >
                    <Link href={route.href}>
                      <route.icon className="h-6 w-6" />
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {state === "expanded" && (
          <div
            className={`flex items-center justify-between p-2 flex-nowrap group-data-[collapsible=icon]:overflow-hidden transition-all duration-700 delay-300 ${
              state === "expanded"
                ? "max-w-full opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:overflow-hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex flex-col shrink-0">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Student</span>
              </div>

            </div>

            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        )}

        {state === "collapsed" && (
          <div className="pb-2 transition-all duration-300 delay-300">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}}>
                  Log out 
                  <LogOutIcon className="inline-block ml-auto"/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
