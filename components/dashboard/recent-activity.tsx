import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const activities = [
    {
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      action: "created a new task",
      target: "Website Redesign",
      time: "2 hours ago",
    },
    {
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      action: "commented on",
      target: "Budget Planning",
      time: "3 hours ago",
    },
    {
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MB",
      },
      action: "completed",
      target: "Q1 Report",
      time: "5 hours ago",
    },
    {
      user: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
      action: "updated status on",
      target: "Marketing Campaign",
      time: "1 day ago",
    },
    {
      user: {
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RW",
      },
      action: "assigned",
      target: "Client Presentation",
      time: "1 day ago",
    },
  ]

  return (
    <div className={`rounded-xl border bg-card p-6 ${className}`} {...props}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

