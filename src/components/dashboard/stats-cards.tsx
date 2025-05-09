import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Inbox, Trash2, Archive, XCircle, Mail, BarChart } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalSubscriptions: number
    totalUnsubscribed: number
    totalTrashed: number
    totalDeleted: number
    emailsProcessed: number
    averageEmailsPerDay: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Subscriptions",
      value: stats.totalSubscriptions,
      description: "Active email subscriptions",
      icon: <Inbox className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50 dark:bg-blue-950/50",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Unsubscribed",
      value: stats.totalUnsubscribed,
      description: "Emails you've unsubscribed from",
      icon: <XCircle className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-50 dark:bg-purple-950/50",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Trashed",
      value: stats.totalTrashed,
      description: "Emails moved to trash",
      icon: <Trash2 className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-50 dark:bg-amber-950/50",
      textColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Deleted",
      value: stats.totalDeleted,
      description: "Permanently deleted emails",
      icon: <Archive className="h-5 w-5 text-red-600" />,
      color: "bg-red-50 dark:bg-red-950/50",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      title: "Emails Processed",
      value: stats.emailsProcessed,
      description: "Total emails analyzed",
      icon: <Mail className="h-5 w-5 text-emerald-600" />,
      color: "bg-emerald-50 dark:bg-emerald-950/50",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Daily Average",
      value: stats.averageEmailsPerDay,
      description: "Average emails per day",
      icon: <BarChart className="h-5 w-5 text-cyan-600" />,
      color: "bg-cyan-50 dark:bg-cyan-950/50",
      textColor: "text-cyan-600 dark:text-cyan-400",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden shadow-sm">
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${card.color} p-4`}>
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className="rounded-full bg-white/90 dark:bg-gray-800/90 p-2 shadow-sm">{card.icon}</div>
          </CardHeader>
          <CardContent className="p-6">
            <div className={`text-3xl font-bold ${card.textColor}`}>
              {typeof card.value === "number" && !Number.isInteger(card.value)
                ? card.value.toFixed(1)
                : card.value.toLocaleString()}
            </div>
            <CardDescription className="mt-2 text-sm">{card.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
