"use client"

import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  CartesianGrid,
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

interface ActivityChartProps {
  data: Array<{
    date: string
    subscriptions: number
    unsubscribed: number
    trashed: number
    deleted: number
  }>
}

export function ActivityLineChart({ data }: ActivityChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }))

  const chartData =
    formattedData.length === 1
      ? [
          { ...formattedData[0], date: `${formattedData[0].date} (Start)` },
          { ...formattedData[0], date: `${formattedData[0].date} (End)` },
        ]
      : formattedData

  const hasNonZeroData = chartData.some(
    (item) =>
      item.subscriptions > 0 ||
      item.unsubscribed > 0 ||
      item.trashed > 0 ||
      item.deleted > 0
  )

  const displayData = hasNonZeroData
    ? chartData
    : chartData.map((item) => ({
        ...item,
        subscriptions: item.subscriptions === 0 ? 1 : item.subscriptions,
      }))

  const chartConfig = {
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
  }

  return (
    <Card className="col-span-1 lg:col-span-3 shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>Email management activity over time</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[350px] w-full overflow-hidden">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="99%" height="99%">
              <LineChart data={displayData} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  height={40}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 12 }} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: "10px" }} />
                <Line
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="var(--color-subscriptions)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="unsubscribed"
                  stroke="var(--color-unsubscribed)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="trashed"
                  stroke="var(--color-trashed)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="deleted"
                  stroke="var(--color-deleted)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing activity summary over time
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
