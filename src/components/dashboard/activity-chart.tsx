"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface ActivityChartProps {
  data: Array<{
    date: string
    subscriptions: number
    unsubscribed: number
    trashed: number
    deleted: number
  }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  // Format dates for better display
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>Email management activity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              subscriptions: {
                label: "Active Subscriptions",
                color: "hsl(var(--chart-1))",
              },
              unsubscribed: {
                label: "Unsubscribed",
                color: "hsl(var(--chart-2))",
              },
              trashed: {
                label: "Trashed",
                color: "hsl(var(--chart-3))",
              },
              deleted: {
                label: "Deleted",
                color: "hsl(var(--chart-4))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="var(--color-subscriptions)"
                  fill="var(--color-subscriptions)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="unsubscribed"
                  stroke="var(--color-unsubscribed)"
                  fill="var(--color-unsubscribed)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="trashed"
                  stroke="var(--color-trashed)"
                  fill="var(--color-trashed)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="deleted"
                  stroke="var(--color-deleted)"
                  fill="var(--color-deleted)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
