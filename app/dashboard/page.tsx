"use client"

import ThemeToggleBtn from '@/components/theme-toggle-btn'
import { Button } from '@/components/ui/button'
import {  Loader } from '@/components/ui/Loader'
import { Building2,  Users,  FileText,  CreditCard,  Bell,  Settings,  LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function Dashboard() {

    const {data:session , status} = useSession()
  
    if( status === "loading" ) return <Loader/>
    
    if(!session) return null;

    const handleLogoutUser = () => {
      
      try {
        
        signOut({
          callbackUrl:"/"
        })
        
        toast.success("loggout successfully.")
      } catch (error) {
        const err = (error as Error).message
        toast.error(err || "something went wrong");
      }

    }

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr]">
      <div className="border-r bg-muted/40">
        <div className="flex h-16 items-center gap-2 px-6 border-b">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold">HMS Dashboard</span>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Button variant="ghost" className="justify-start gap-2">
            <Users className="h-5 w-5" />
            Student Profile
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Building2 className="h-5 w-5" />
            Room Allocation
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <FileText className="h-5 w-5" />
            Complaints
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <CreditCard className="h-5 w-5" />
            Fee Details
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </nav>
      </div>

      <div>
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="font-semibold">Dashboard {session.user?.name} </h1>
          <div className="flex items-center gap-4">
            <ThemeToggleBtn/>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogoutUser}>

              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Total Students</span>
              </div>
              <p className="mt-4 text-2xl font-bold">256</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Available Rooms</span>
              </div>
              <p className="mt-4 text-2xl font-bold">42</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">Active Complaints</span>
              </div>
              <p className="mt-4 text-2xl font-bold">8</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">Pending Fees</span>
              </div>
              <p className="mt-4 text-2xl font-bold">12</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="rounded-lg border">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between p-4 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">New Room Allocation</p>
                    <p className="text-sm text-muted-foreground">
                      Room 301 allocated to John Doe
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}