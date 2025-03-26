"use client";

import { Bell, LogOutIcon, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import ThemeToggleBtn from "../theme-toggle-btn";
import { useEffect, useState } from "react";
import { useClientSession } from "@/hooks/useClientSession";
import Link from "next/link";

export function DashboardHeader() {
  const [session, setSession] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const clientSession = useClientSession();

  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (clientSession) {
      setSession(clientSession);
    }
  }, [clientSession]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      <div className="hidden flex-1 md:flex">
        <form className="relative flex-1 md:max-w-sm lg:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </form>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
        <ThemeToggleBtn />
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.profilePicture || ""} alt="User" />
                <AvatarFallback>{session?.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none capitalize">
                  {session?.name || ""}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={"/dashboard/profile"}
                className="flex gap-1 justify-between w-full"
              >
                <span>Profile</span>
                <User className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={"/dashboard/settings"}
                className="flex gap-1 justify-between w-full"
              >
                <span>Settings</span>
                <Settings className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <LogOutIcon className="inline-block ml-auto text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
