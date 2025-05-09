import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Eye, MousePointer, Reply, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EngagementMetricsProps {
  metrics: {
    openRate: number
    clickRate: number
    responseRate: number
  }
}

export function EngagementMetrics({ metrics }: EngagementMetricsProps) {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`

  const hasEngagementData = metrics.openRate > 0 || metrics.clickRate > 0 || metrics.responseRate > 0

  const metrics_data = [
    {
      title: "Open Rate",
      value: metrics.openRate,
      icon: <Eye className="h-4 w-4" />,
      description: "Percentage of emails opened",
      color: "var(--blue-500, hsl(217, 91%, 60%))",
    },
    {
      title: "Click Rate",
      value: metrics.clickRate,
      icon: <MousePointer className="h-4 w-4" />,
      description: "Percentage of emails clicked",
      color: "var(--purple-500, hsl(259, 94%, 61%))",
    },
    {
      title: "Response Rate",
      value: metrics.responseRate,
      icon: <Reply className="h-4 w-4" />,
      description: "Percentage of emails responded to",
      color: "var(--emerald-500, hsl(152, 76%, 44%))",
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Engagement Metrics</CardTitle>
        <CardDescription>How you interact with your subscriptions</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasEngagementData ? (
          <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-600 dark:text-blue-400">
              No engagement data is available yet. This will be populated as you interact with your emails.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            {metrics_data.map((metric) => (
              <div key={metric.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {metric.icon}
                    <span className="text-sm font-medium">{metric.title}</span>
                  </div>
                  <span className="text-sm font-medium">{formatPercentage(metric.value)}</span>
                </div>
                <Progress
                  value={metric.value * 100}
                  className="h-2"
                  style={{ "--progress-foreground": metric.color } as React.CSSProperties}
                />
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
