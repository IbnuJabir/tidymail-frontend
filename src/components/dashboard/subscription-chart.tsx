
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface SubscriptionChartProps {
  data: Array<{
    name: string
    count: number
    category: string | null
  }>
}

// Custom colors for the pie chart
const COLORS = ["#8B5CF6", "#F97316", "#0EA5E9", "#1EAEDB", "#33C3F0"]

const chartConfig = {
  count: {
    label: "Emails",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SubscriptionChart({ data }: SubscriptionChartProps) {
  const totalCount = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0)
  }, [data])

  const chartData = React.useMemo(() => {
    return data.map((item, index) => ({
      name: item.name,
      count: item.count,
      fill: COLORS[index % COLORS.length]
    }));
  }, [data]);

  return (
    <Card className="flex flex-col w-full shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Subscriptions by Email Count</CardTitle>
        <CardDescription>Your most active email subscriptions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={80}
              outerRadius={140}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Top 5 Subscriptions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-6">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-5">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <div className="flex flex-col">
                <span className="text-xs font-medium truncate max-w-[120px]" title={item.name}>
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {((item.count / totalCount) * 100).toFixed(1)}% ({item.count})
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
