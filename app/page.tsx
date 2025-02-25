"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Users, FileText, CreditCard } from "lucide-react";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">HMS</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link href="/signin">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="container px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
            Welcome to <span className="text-primary">Hostel Management</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A modern solution for managing student accommodations, room
            allocations, and hostel facilities.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section className="container px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Student Management</h3>
              <p className="mt-2 text-muted-foreground">
                Efficiently manage student profiles and room assignments.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <Building2 className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Room Allocation</h3>
              <p className="mt-2 text-muted-foreground">
                Streamlined room allocation and management system.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <FileText className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Complaint System</h3>
              <p className="mt-2 text-muted-foreground">
                Easy complaint registration and tracking.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <CreditCard className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Fee Management</h3>
              <p className="mt-2 text-muted-foreground">
                Simplified fee collection and payment tracking.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
