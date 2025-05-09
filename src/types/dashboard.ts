// Define the types for our API response
export interface EmailAnalyticsResponse {
    stats: {
      totalSubscriptions: number
      totalUnsubscribed: number
      totalTrashed: number
      totalDeleted: number
      emailsProcessed: number
      averageEmailsPerDay: number
    }
    topSubscriptions: Array<{
      name: string
      count: number
      category: string
    }>
    activityTimeline: Array<{
      date: string
      subscriptions: number
      unsubscribed: number
      trashed: number
      deleted: number
    }>
    categoryBreakdown: Array<{
      category: string
      count: number
    }>
    emailVolume: {
      daily: Array<{ date: string; count: number }>
      weekly: Array<{ week: string; count: number }>
      monthly: Array<{ month: string; count: number }>
    }
    engagementMetrics: {
      openRate: number
      clickRate: number
      responseRate: number
    }
  }