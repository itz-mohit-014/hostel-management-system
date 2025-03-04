"use client"

import type React from "react"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200,
  },
  {
    name: "Feb",
    total: 2100,
  },
  {
    name: "Mar",
    total: 1800,
  },
  {
    name: "Apr",
    total: 2400,
  },
  {
    name: "May",
    total: 2800,
  },
  {
    name: "Jun",
    total: 3200,
  },
  {
    name: "Jul",
    total: 2900,
  },
  {
    name: "Aug",
    total: 3500,
  },
  {
    name: "Sep",
    total: 3800,
  },
  {
    name: "Oct",
    total: 4000,
  },
  {
    name: "Nov",
    total: 4200,
  },
  {
    name: "Dec",
    total: 4800,
  },
]

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Overview({ className, ...props }: OverviewProps) {
  return (
    <div className={`rounded-xl border bg-card p-6 ${className}`} {...props}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Overview</h3>
          <div className="text-sm text-muted-foreground">Monthly Revenue</div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

