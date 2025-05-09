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

  // If there's only one data point, duplicate it to show a line
  const chartData =
    formattedData.length === 1
      ? [
          { ...formattedData[0], date: `${formattedData[0].date} (Start)` },
          { ...formattedData[0], date: `${formattedData[0].date} (End)` },
        ]
      : formattedData

  // Check if we have any non-zero data
  const hasNonZeroData = chartData.some(
    (item) => item.subscriptions > 0 || item.unsubscribed > 0 || item.trashed > 0 || item.deleted > 0,
  )

  // If all data is zero, add a small value to make the chart visible
  const displayData = hasNonZeroData
    ? chartData
    : chartData.map((item) => ({
        ...item,
        subscriptions: item.subscriptions === 0 ? 1 : item.subscriptions,
      }))

  return (
    <Card className="col-span-1 lg:col-span-3 shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>Email management activity over time</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[350px] w-full overflow-hidden">
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
            className="h-full w-full"
          >
            <ResponsiveContainer width="99%" height="99%">
              <AreaChart data={displayData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} height={40} />
                <YAxis width={40} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: "10px" }} />
                <Area
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="var(--color-subscriptions)"
                  fill="var(--color-subscriptions)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="unsubscribed"
                  stroke="var(--color-unsubscribed)"
                  fill="var(--color-unsubscribed)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="trashed"
                  stroke="var(--color-trashed)"
                  fill="var(--color-trashed)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="deleted"
                  stroke="var(--color-deleted)"
                  fill="var(--color-deleted)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
