"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function TutorialPage() {
  const router = useRouter()

  const tutorials = [
    {
      id: "emails",
      title: "Managing Emails",
      steps: [
        "View all your emails in the Emails tab",
        "Select emails using the checkboxes",
        "Use the action buttons to manage selected emails",
        "Search for specific emails using the search bar",
      ],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "subscriptions",
      title: "Managing Subscriptions",
      steps: [
        "View all your subscriptions in the Subscriptions tab",
        "Unsubscribe from unwanted emails with one click",
        "Move subscriptions to trash or delete them permanently",
        "Filter subscriptions by domain or name",
      ],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "actions",
      title: "Bulk Actions",
      steps: [
        "Select multiple items using checkboxes",
        "Use the bulk action buttons at the top",
        "Confirm actions in the popup dialog",
        "View status updates for completed actions",
      ],
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">How to Use TidyMail</h2>

      <Tabs defaultValue="emails" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          {tutorials.map((tutorial) => (
            <TabsTrigger key={tutorial.id} value={tutorial.id}>
              {tutorial.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tutorials.map((tutorial) => (
          <TabsContent key={tutorial.id} value={tutorial.id} className="space-y-4">
            <div className="flex justify-center my-4">
              <Image
                src={tutorial.image || "/placeholder.svg"}
                alt={tutorial.title}
                width={400}
                height={200}
                className="rounded-md border shadow-sm"
              />
            </div>

            <ul className="space-y-2">
              {tutorial.steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/onboarding/features")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => router.push("/onboarding/complete")} className="gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
