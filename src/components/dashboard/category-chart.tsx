
"use client"

import { BarChart as BarChartIcon, TrendingUp } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts"

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

  // Calculate total for percentage
  const total = sortedData.reduce((sum, item) => sum + item.count, 0)
  
  // Define chart colors - expanded color palette for 13+ categories
  const chartConfig = {
    count: {
      label: "Subscriptions",
      color: "hsl(var(--chart-1))",
    },
    // Color palette for categories
    category0: { color: "#8B5CF6" },  // Vivid Purple
    category1: { color: "#F97316" },  // Bright Orange
    category2: { color: "#0EA5E9" },  // Ocean Blue
    category3: { color: "#33C3F0" },  // Sky Blue
    category4: { color: "#ea384c" },  // Red
    category5: { color: "#10B981" },  // Emerald Green
    category6: { color: "#EC4899" },  // Pink
    category7: { color: "#F59E0B" },  // Amber
    category8: { color: "#6366F1" },  // Indigo
    category9: { color: "#14B8A6" },  // Teal
    category10: { color: "#84CC16" }, // Lime
    category11: { color: "#A855F7" }, // Purple
    category12: { color: "#D946EF" }, // Fuchsia
    category13: { color: "#3B82F6" }, // Blue
    category14: { color: "#64748B" }, // Slate
  } satisfies ChartConfig

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BarChartIcon className="h-5 w-5" />
            Category Breakdown
          </CardTitle>
          <CardDescription>Subscriptions by category</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{
              left: -10,
              right: 10,
              bottom: 5,
            }}
            height={Math.max(200, sortedData.length * 50)}
            barSize={24} // Set the thickness/width of the bars
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel={false} 
                  formatter={(value, name) => {
                    return [
                      `${value} subscriptions`,
                      ` ${((Number(value) / total) * 100).toFixed(1)}%`
                    ]
                  }}
                />
              }
            />
            <Bar 
              dataKey="count" 
              radius={[0, 5, 5, 0]} 
              fill="var(--color-count)"
              isAnimationActive={true}
              animationDuration={1000}
            >
              {sortedData.map((entry, index) => (
                <rect 
                  key={`rect-${entry.category}`} 
                  fill={`var(--color-category${index % 15})`} 
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
        <div className="flex items-center gap-2 font-medium leading-none">
          {sortedData.length > 0 && (
            <>
              <span>{sortedData[0].category}</span> is your largest category 
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing {total} subscriptions across {sortedData.length} categories
        </div>
      </CardFooter>
    </Card>
  )
}