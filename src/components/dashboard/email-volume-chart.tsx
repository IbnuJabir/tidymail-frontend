"use client";

import { GitCommitVertical, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmailVolumeChartProps {
  data: {
    daily: Array<{ date: string; count: number }>;
    weekly: Array<{ week: string; count: number }>;
    monthly: Array<{ month: string; count: number }>;
  };
}
type DataItem = { [key: string]: string | number };

export function EmailVolumeChart({ data }: EmailVolumeChartProps) {
  // Format dates for better display
  const formattedDaily = data.daily.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  // If there's only one data point in any category, duplicate it to show a line
  const processData = (dataArray: DataItem[], keyName: string) => {
    if (dataArray.length === 1) {
      return [
        { ...dataArray[0], [keyName]: `${dataArray[0][keyName]} (Start)` },
        { ...dataArray[0], [keyName]: `${dataArray[0][keyName]} (End)` },
      ];
    }
    return dataArray;
  };

  const dailyData = processData(formattedDaily, "date");
  const weeklyData = processData(data.weekly, "week");
  const monthlyData = processData(data.monthly, "month");

  // Calculate trend percentage (for demo purposes - in real app you'd calculate this properly)
  const getTrendPercentage = (chartData: DataItem[]) => {
    if (chartData.length < 2) return 0;

    const first = Number(chartData[0].count);
    const last = Number(chartData[chartData.length - 1].count);

    if (first === 0) return 0;
    return ((last - first) / first) * 100;
  };

  const trendPercentage = {
    daily: getTrendPercentage(dailyData),
    weekly: getTrendPercentage(weeklyData),
    monthly: getTrendPercentage(monthlyData),
  };

  const chartConfig = {
    count: {
      label: "Emails",
      color: "#9b87f5", // Primary Purple
    },
  } satisfies ChartConfig;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Email Volume</CardTitle>
        <CardDescription>Number of emails received over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-6">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <div className="h-[900px]">
            <TabsContent value="daily" className="h-full mt-0">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="99%" height="100%">
                  <LineChart
                    accessibilityLayer
                    data={dailyData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                      width={30}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="count"
                      type="natural"
                      stroke="var(--color-count)"
                      strokeWidth={2}
                      dot={({ cx, cy, payload }) => {
                        const r = 20;
                        return (
                          <GitCommitVertical
                            key={`${payload.date}`}
                            x={cx - r / 2}
                            y={cy - r / 2}
                            width={r}
                            height={r}
                            fill="hsl(var(--background))"
                            stroke="var(--color-count)"
                          />
                        );
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="weekly" className="h-full mt-0">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="99%" height="100%">
                  <LineChart
                    accessibilityLayer
                    data={weeklyData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      width={30}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="count"
                      type="natural"
                      stroke="var(--color-count)"
                      strokeWidth={2}
                      dot={({ cx, cy, payload }) => {
                        const r = 20;
                        return (
                          <GitCommitVertical
                            key={`${payload.week}`}
                            x={cx - r / 2}
                            y={cy - r / 2}
                            width={r}
                            height={r}
                            fill="hsl(var(--background))"
                            stroke="var(--color-count)"
                          />
                        );
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="monthly" className="h-full mt-0">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="99%" height="100%">
                  <LineChart
                    accessibilityLayer
                    data={monthlyData}
                    margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                      width={30}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="count"
                      type="natural"
                      stroke="var(--color-count)"
                      strokeWidth={2}
                      dot={({ cx, cy, payload }) => {
                        const r = 20;
                        return (
                          <GitCommitVertical
                            key={`${payload.month}`}
                            x={cx - r / 2}
                            y={cy - r / 2}
                            width={r}
                            height={r}
                            fill="hsl(var(--background))"
                            stroke="var(--color-count)"
                          />
                        );
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex gap-2 font-medium leading-none cursor-help">
                {trendPercentage.daily > 0 ? (
                  <span>
                    Trending up by {trendPercentage.daily.toFixed(1)}%{" "}
                    <TrendingUp className="inline h-4 w-4" />
                  </span>
                ) : (
                  <span>
                    Trending down by{" "}
                    {Math.abs(trendPercentage.daily).toFixed(1)}%{" "}
                    <TrendingUp className="inline h-4 w-4 rotate-180" />
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Based on the currently selected time period
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="leading-none text-muted-foreground">
          Showing email volume for the selected time period
        </div>
      </CardFooter>
    </Card>
  );
}