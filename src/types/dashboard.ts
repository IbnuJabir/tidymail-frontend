// Define the types for our API response
export interface EmailAnalyticsResponse {
  stats: {
    totalSubscriptions: number;
    totalUnsubscribed: number;
    totalTrashed: number;
    totalDeleted: number;
    emailsProcessed: number;
    averageEmailsPerDay: number;
  };
  topSubscriptions: Array<{
    name: string;
    count: number;
    category: string;
  }>;
  activityTimeline: Array<{
    date: string;
    subscriptions: number;
    unsubscribed: number;
    trashed: number;
    deleted: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
  }>;
  emailVolume: {
    daily: Array<{ date: string; count: number }>;
    weekly: Array<{ week: string; count: number }>;
    monthly: Array<{ month: string; count: number }>;
  };
  engagementMetrics: {
    openRate: number;
    clickRate: number;
    responseRate: number;
  };
}

export interface UsageStatsResponse {
  usage: {
    subscription: {
      plan: string;
      status: string;
      starts_at: string;
      ends_at: string | null; // ISO date string or null
      renews_at: string; // ISO date string
    };
    usage: {
      period: string; // e.g., "2025-05"
      unsubscribe_count: number;
      trash_count: number;
      delete_count: number;
      resubscribe_count: number;
      bulk_action_count: number;
      analyze_count: number;
    };
    limits: {
      unsubscribe_limit: number;
      trash_limit: number;
      delete_limit: number;
      analyze_limit: number;
      can_resubscribe: boolean;
      can_bulk_action: boolean;
      is_unlimited: boolean;
    };
    is_active: boolean;
  };
}
