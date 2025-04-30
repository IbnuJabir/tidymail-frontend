"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsPage() {
  const router = useRouter()
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center">Terms & Privacy Policy</h2>

      <ScrollArea className="h-64 rounded-md border p-4 mb-6">
        <div className="space-y-4">
          <h3 className="font-bold">Terms of Service</h3>
          <p>Welcome to TidyMail. By using our services, you agree to these terms. Please read them carefully.</p>
          <p>
            TidyMail provides email organization services that help you manage subscriptions, clean your inbox, and
            more. We require access to your email data to provide these services.
          </p>
          <p>
            You retain ownership of your data. We only process the data necessary for the app's functionality. You are
            responsible for maintaining the confidentiality of your account information.
          </p>
          <p>We may update these terms from time to time. We will notify you of any significant changes.</p>

          <h3 className="font-bold mt-6">Privacy Policy</h3>
          <p>TidyMail collects and processes your email data to provide our services. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email addresses and sender information</li>
            <li>Email subject lines and timestamps</li>
            <li>Subscription information</li>
          </ul>
          <p>
            We use this data to identify subscriptions, organize your inbox, and provide our services. We do not sell
            your data to third parties or use it for advertising purposes.
          </p>
          <p>You can request deletion of your data at any time by contacting us.</p>
        </div>
      </ScrollArea>

      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={() => setAgreedToTerms(!agreedToTerms)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Terms of Service
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={agreedToPrivacy}
            onCheckedChange={() => setAgreedToPrivacy(!agreedToPrivacy)}
          />
          <label
            htmlFor="privacy"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Privacy Policy
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/onboarding/disclaimer")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={() => router.push("/onboarding/features")}
          disabled={!agreedToTerms || !agreedToPrivacy}
          className="gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
