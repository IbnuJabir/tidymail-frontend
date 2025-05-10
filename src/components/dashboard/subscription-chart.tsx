"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"
import { useState } from "react"

interface SubscriptionChartProps {
  data: Array<{
    name: string
    count: number
    category: string | null
  }>
}

// Define types for the active shape props
interface ActiveShapeProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  fill: string
  payload: {
    name: string
    count: number
    category: string | null
  }
  percent: number
  value: number
}

// Custom colors for the pie chart
const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#10b981"]

// Define the renderActiveShape function with the correct type signature
const renderActiveShape = (props: unknown) => {
  // Cast the unknown props to our expected type
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } =
    props as ActiveShapeProps

  const sin = Math.sin((-midAngle * Math.PI) / 180)
  const cos = Math.cos((-midAngle * Math.PI) / 180)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
        {`${payload.name} (${value})`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export function SubscriptionChart({ data }: SubscriptionChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: React.MouseEvent<SVGElement>, index: number) => {
    setActiveIndex(index)
  }

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm">
      <CardHeader>
        <CardTitle>Top Subscriptions by Email Count</CardTitle>
        <CardDescription>Your most active email subscriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] flex items-center justify-center">
          <ChartContainer
            config={{
              count: {
                label: "Emails",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="count"
                  onMouseEnter={onPieEnter}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <div className="flex flex-col">
                <span className="text-xs font-medium truncate max-w-[120px]" title={item.name}>
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {((item.count / total) * 100).toFixed(1)}% ({item.count})
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
