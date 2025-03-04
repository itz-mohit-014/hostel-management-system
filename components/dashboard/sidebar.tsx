"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BedDouble,
  CalendarCheck,
  FileText,
  Home,
  LayoutDashboard,
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
} from "@/components/ui/sidebar"
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
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <div className="font-semibold">Hostel Management</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                    <Link href={route.href}>
                      <route.icon className="h-4 w-4" />
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
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Student</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

