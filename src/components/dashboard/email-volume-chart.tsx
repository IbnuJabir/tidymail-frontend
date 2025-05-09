"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface EmailVolumeChartProps {
  data: {
    daily: Array<{ date: string; count: number }>
    weekly: Array<{ week: string; count: number }>
    monthly: Array<{ month: string; count: number }>
  }
}

export function EmailVolumeChart({ data }: EmailVolumeChartProps) {
  // Format dates for better display
  const formattedDaily = data.daily.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  // If there's only one data point in any category, duplicate it to show a line
  const processData = (dataArray: any[], keyName: string) => {
    if (dataArray.length === 1) {
      return [
        { ...dataArray[0], [keyName]: `${dataArray[0][keyName]} (Start)` },
        { ...dataArray[0], [keyName]: `${dataArray[0][keyName]} (End)` },
      ]
    }
    return dataArray
  }

  const dailyData = processData(formattedDaily, "date")
  const weeklyData = processData(data.weekly, "week")
  const monthlyData = processData(data.monthly, "month")

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Email Volume</CardTitle>
        <CardDescription>Number of emails received over time</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <Tabs defaultValue="daily" className="px-6">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <div className="h-[350px] w-full overflow-hidden">
            <ChartContainer
              config={{
                count: {
                  label: "Emails",
                  color: "hsl(var(--chart-6))",
                },
              }}
              className="h-full w-full"
            >
              <div className="h-full w-full">
                <TabsContent value="daily" className="h-full mt-0">
                  <ResponsiveContainer width="99%" height="99%">
                    <LineChart data={dailyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} height={40} />
                      <YAxis width={40} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="var(--color-count)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="weekly" className="h-full mt-0">
                  <ResponsiveContainer width="99%" height="99%">
                    <LineChart data={weeklyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} height={40} />
                      <YAxis width={40} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="var(--color-count)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="monthly" className="h-full mt-0">
                  <ResponsiveContainer width="99%" height="99%">
                    <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} height={40} />
                      <YAxis width={40} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="var(--color-count)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </div>
            </ChartContainer>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
