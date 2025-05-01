"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DisclaimerPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Important Disclaimer</h2>

      <Alert variant="default" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Please read carefully</AlertTitle>
        <AlertDescription>
          TidyMail requires access to your email data to help you organize your inbox.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 mb-8">
        <p>By using TidyMail, you understand and agree that:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>TidyMail will analyze your emails to identify subscriptions and organize your inbox.</li>
          <li>We only process the data necessary for the app&apos;s functionality.</li>
          <li>Your email data is stored securely and not shared with third parties.</li>
          <li>You can request deletion of your data at any time.</li>
          <li>TidyMail is not responsible for any unintended consequences of unsubscribing from emails.</li>
        </ul>

        <p className="font-medium mt-4">
          We take your privacy seriously and implement industry-standard security measures to protect your data.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/onboarding")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => router.push("/onboarding/terms")} className="gap-2">
          I Understand <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
