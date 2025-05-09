"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface CategoryChartProps {
  data: Array<{
    category: string | null
    count: number
  }>
}

export function CategoryChart({ data }: CategoryChartProps) {
  // Process data to handle null categories
  const processedData = data.map((item) => ({
    category: item.category || "Uncategorized",
    count: item.count,
  }))

  // Sort data by count in descending order
  const sortedData = [...processedData].sort((a, b) => b.count - a.count)

  // Use custom colors for the bars
  const getBarColor = (index: number) => {
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#10b981", "#06b6d4", "#6366f1"]
    return colors[index % colors.length]
  }

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
        <CardDescription>Subscriptions by category</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="h-[200px] w-full overflow-hidden px-4">
          <ResponsiveContainer width="99%" height="99%">
            <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="category" width={120} tick={{ fontSize: 12 }} />
              <ChartTooltip
                content={(props) => {
                  const { active, payload } = props
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow-sm">
                        <p className="font-medium">{payload[0].payload.category}</p>
                        <p className="text-sm">Count: {payload[0].value}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                // Apply different colors to each bar
                isAnimationActive={false}
              >
                {sortedData.map((entry, index) => (
                  <rect key={`rect-${entry.category}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
