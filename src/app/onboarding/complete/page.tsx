"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useEffect } from "react"

export default function CompletePage() {
  const router = useRouter()

  // In a real app, you might want to set a cookie or localStorage item
  // to remember that the user has completed onboarding
  useEffect(() => {
    localStorage.setItem("onboardingComplete", "true")
  }, [])

  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-primary/10 p-4 mb-6">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>

      <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>

      <p className="text-muted-foreground mb-8 max-w-md">
        Thank you for completing the onboarding process. You're now ready to start using TidyMail to organize your
        emails and manage your subscriptions.
      </p>

      <Button onClick={() => router.push("/subscriptions")} size="lg">
        Go to Dashboard
      </Button>
    </div>
  )
}
