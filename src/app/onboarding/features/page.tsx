"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Mail, UserRound, Trash, Trash2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  const router = useRouter()

  const features = [
    {
      title: "Email Organization",
      description: "View and manage all your emails in one place",
      icon: Mail,
    },
    {
      title: "Subscription Management",
      description: "Easily unsubscribe from unwanted emails",
      icon: UserRound,
    },
    {
      title: "Trash Management",
      description: "Move emails to trash and restore them if needed",
      icon: Trash,
    },
    {
      title: "Permanent Deletion",
      description: "Permanently delete emails you no longer need",
      icon: Trash2,
    },
    {
      title: "Re-subscribe",
      description: "Subscribe back to services you accidentally unsubscribed from",
      icon: RefreshCw,
    },
  ]

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-5 w-5" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/onboarding/terms")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => router.push("/onboarding/tutorial")} className="gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
