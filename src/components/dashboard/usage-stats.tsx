"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Unlink,
  Trash2,
  Archive,
  RotateCcw,
  Layers,
  Search,
  Crown,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Info,
  Zap,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type usage = {
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
interface UsagePageProps {
  usageStat: usage;
  onRefresh: () => void;
}

export function UsagePage({ usageStat, onRefresh }: UsagePageProps) {
  const { subscription, usage, limits, is_active } = usageStat;

  // Format the period (e.g., "2025-05" to "May 2025")
  const formatPeriod = (period: string) => {
    const [year, month] = period.split("-");
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate progress percentage
  const getProgressPercentage = (used: number, limit: number) => {
    if (limit === -1 || limits.is_unlimited) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  // Get status color and variant
  const getUsageStatus = (used: number, limit: number) => {
    if (limit === -1 || limits.is_unlimited) {
      return {
        color: "text-green-600",
        variant: "default" as const,
        status: "unlimited",
      };
    }
    const percentage = (used / limit) * 100;
    if (percentage >= 100) {
      return {
        color: "text-red-600",
        variant: "destructive" as const,
        status: "exceeded",
      };
    }
    if (percentage >= 90) {
      return {
        color: "text-red-600",
        variant: "destructive" as const,
        status: "critical",
      };
    }
    if (percentage >= 70) {
      return {
        color: "text-amber-600",
        variant: "default" as const,
        status: "warning",
      };
    }
    return {
      color: "text-green-600",
      variant: "default" as const,
      status: "good",
    };
  };

  const usageItems = [
    {
      title: "Unsubscribe Actions",
      used: usage.unsubscribe_count,
      limit: limits.unsubscribe_limit,
      icon: <Unlink className="h-5 w-5" />,
      description: "Emails unsubscribed this month",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      title: "Trash Actions",
      used: usage.trash_count,
      limit: limits.trash_limit,
      icon: <Trash2 className="h-5 w-5" />,
      description: "Emails moved to trash this month",
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/50",
    },
    {
      title: "Delete Actions",
      used: usage.delete_count,
      limit: limits.delete_limit,
      icon: <Archive className="h-5 w-5" />,
      description: "Emails permanently deleted this month",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/50",
    },
    {
      title: "Analysis Runs",
      used: usage.analyze_count,
      limit: limits.analyze_limit,
      icon: <Search className="h-5 w-5" />,
      description: "Email analyses performed this month",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
    },
  ];

  // Calculate total usage percentage for overview
  const totalUsageItems = usageItems.filter(
    (item) => item.limit !== -1 && !limits.is_unlimited
  );
  const averageUsage =
    totalUsageItems.length > 0
      ? totalUsageItems.reduce(
          (acc, item) => acc + getProgressPercentage(item.used, item.limit),
          0
        ) / totalUsageItems.length
      : 0;

  // Check if any limits are exceeded or near limits
  const hasWarnings = usageItems.some((item) => {
    const status = getUsageStatus(item.used, item.limit);
    return status.status === "critical" || status.status === "exceeded";
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Usage & Limits</h1>
          <p className="text-muted-foreground">
            Monitor your monthly usage and plan limits. Usage resets on the 1st
            of each month.
          </p>
        </div>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Warnings Alert */}
      {hasWarnings && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You&apos;re approaching or have exceeded some usage limits. Consider
            upgrading your plan for unlimited access.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Usage Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Usage Overview */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Usage Overview
                  </CardTitle>
                  <CardDescription>
                    Current period: {formatPeriod(usage.period)}
                  </CardDescription>
                </div>
                {!limits.is_unlimited && (
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {averageUsage.toFixed(0)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average usage
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Detailed Usage Stats */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Detailed Usage</CardTitle>
              <CardDescription>
                Track your usage for each action type against your plan limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {usageItems.map((item) => {
                const status = getUsageStatus(item.used, item.limit);
                return (
                  <div key={item.title} className="space-y-3">
                    <div className={`p-4 rounded-lg ${item.bgColor}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`${item.color}`}>{item.icon}</div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${status.color}`}>
                            {item.used}
                            {!limits.is_unlimited && item.limit !== -1 && (
                              <span className="text-muted-foreground">
                                {" "}
                                / {item.limit}
                              </span>
                            )}
                            {limits.is_unlimited && (
                              <span className="text-green-600 ml-1">∞</span>
                            )}
                          </div>
                          {!limits.is_unlimited && item.limit !== -1 && (
                            <div className="text-sm text-muted-foreground">
                              {getProgressPercentage(
                                item.used,
                                item.limit
                              ).toFixed(0)}
                              % used
                            </div>
                          )}
                        </div>
                      </div>

                      {!limits.is_unlimited && item.limit !== -1 && (
                        <div className="space-y-1">
                          <Progress
                            value={getProgressPercentage(item.used, item.limit)}
                            className="h-2"
                          />
                          {status.status === "exceeded" && (
                            <p className="text-xs text-red-600">
                              Limit exceeded
                            </p>
                          )}
                          {status.status === "critical" && (
                            <p className="text-xs text-red-600">Near limit</p>
                          )}
                          {status.status === "warning" && (
                            <p className="text-xs text-amber-600">
                              Approaching limit
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Plan Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                <CardTitle className="capitalize">
                  {subscription.plan} Plan
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={is_active ? "default" : "secondary"}
                  className="capitalize"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {subscription.status}
                </Badge>
              </div>

              {limits.is_unlimited && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Access</span>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Unlimited
                  </Badge>
                </div>
              )}

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Started</span>
                  <span>{formatDate(subscription.starts_at)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Renews</span>
                  <span>{formatDate(subscription.renews_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Features */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Available Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Resubscribe</span>
                  </div>
                  <Badge
                    variant={limits.can_resubscribe ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {limits.can_resubscribe ? "Available" : "Unavailable"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Bulk Actions</span>
                  </div>
                  <Badge
                    variant={limits.can_bulk_action ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {limits.can_bulk_action ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Additional Usage Stats */}
              <div className="space-y-2">
                {limits.can_resubscribe && usage.resubscribe_count > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Resubscribed</span>
                    <span className="font-medium">
                      {usage.resubscribe_count}
                    </span>
                  </div>
                )}

                {limits.can_bulk_action && usage.bulk_action_count > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Bulk Actions</span>
                    <span className="font-medium">
                      {usage.bulk_action_count}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Tips */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-4 w-4" />
                Usage Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Usage limits reset on the 1st of each month</p>
              <p>• Bulk actions count as single operations</p>
              <p>• Analysis runs help optimize your email management</p>
              {!limits.is_unlimited && (
                <p>• Consider upgrading for unlimited access</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
