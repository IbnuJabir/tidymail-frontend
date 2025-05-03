"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion"; // Added for animations

export default function DisclaimerPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Important Disclaimer</h2>

      <Alert variant="default" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Please read carefully</AlertTitle>
        <AlertDescription>
          TidyMail needs specific permissions to help you organize your inbox effectively.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 mb-8">
        <p>By using TidyMail, you understand and agree that:</p>

        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            TidyMail will scan your email headers to identify subscription details like sender name, email address, and domain.
            <strong className="text-foreground"> We do not store or analyze the content (body) of your emails.</strong>
          </li>
          <li>
            We only process the minimal data necessary (sender information) for the app's core functionality: identifying and managing subscriptions.
          </li>
          <li>Your extracted subscription data is stored securely and is never shared with third parties.</li>
          <li>You can request the deletion of your account and associated data at any time.</li>
          <li>
            TidyMail provides tools to manage subscriptions, but is not responsible for any unintended consequences of using these tools (e.g., unsubscribing from important emails).
          </li>
        </ul>

        <p className="font-medium mt-4">
          We prioritize your privacy and employ industry-standard security measures to protect your information.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => router.push("/onboarding")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => router.push("/onboarding/terms")} className="gap-2">
          I Understand <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

