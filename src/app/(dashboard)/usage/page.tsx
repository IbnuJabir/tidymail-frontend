"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchUsageStats } from "@/services/email-service"
import { UsagePage } from "@/components/dashboard/usage-stats"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Usage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["usageStats"],
    queryFn: fetchUsageStats,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[400px] rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[300px] rounded-lg" />
            <Skeleton className="h-[200px] rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load usage data. {error instanceof Error ? error.message : "Please try again later."}
            <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return <UsagePage usageStat={data} onRefresh={() => refetch()} />
}
