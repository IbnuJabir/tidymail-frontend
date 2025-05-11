

import { useQuery } from "@tanstack/react-query"
import { fetchEmailAnalytics } from "@/services/email-service"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SubscriptionChart } from "@/components/dashboard/subscription-chart"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { EngagementMetrics } from "@/components/dashboard/engagement-metrics"
import { EmailVolumeChart } from "@/components/dashboard/email-volume-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | TidyMail",
  description: "Dashboard to manage your email subscriptions",
}

export default function DashboardPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["emailAnalytics"],
    queryFn: fetchEmailAnalytics,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Analytics</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[140px] rounded-lg" />
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[350px] rounded-lg" />
          <Skeleton className="h-[350px] rounded-lg" />
        </div>
        <Skeleton className="h-[350px] rounded-lg" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load analytics data. {error instanceof Error ? error.message : "Please try again later."}
          </AlertDescription>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </Alert>
      </div>
    )
  }
  if(!data) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load analytics data. Please try again later.</AlertDescription>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </Alert>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Analytics</h1>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <StatsCards stats={data.stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <SubscriptionChart data={data.topSubscriptions} />
        <div className="flex flex-col gap-6">
          <EngagementMetrics metrics={data.engagementMetrics} />
          <CategoryChart data={data.categoryBreakdown} />
        </div>
      </div>

      <div className="w-full">
        <ActivityChart data={data.activityTimeline} />
      </div>

      <div className="w-full">
        <EmailVolumeChart data={data.emailVolume} />
      </div>
    </div>
  )
}
