"use client";

import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for the policy page
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion"; // Added for animations

export default function TermsPage() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Terms & Privacy Summary</h2>

      <ScrollArea className="h-64 rounded-md border p-4 mb-6 bg-muted/20">
        <div className="space-y-4 text-sm">
          <h3 className="font-bold text-base">Terms of Service Summary</h3>
          <p>
            Welcome to TidyMail. By using our service, you agree to these terms.
            TidyMail helps organize your email by identifying subscriptions.
            Access to certain email data (sender information) is required for this.
          </p>
          <p>
            You retain ownership of your data. We only process the necessary data
            for the app&apos;s functionality. You are responsible for your account security.
            We may update these terms and will notify you of significant changes.
          </p>

          <h3 className="font-bold text-base mt-6">Privacy Policy Summary</h3>
          <p>
            TidyMail processes specific data from your emails solely to provide its
            subscription management services. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Sender email addresses</li>
            <li>Sender names (if available)</li>
            <li>Domain names of senders</li>
          </ul>
          <p className="mt-2">
            <strong className="text-foreground">Crucially, we do not scan, collect, or store the content (body) of your emails.</strong>
            Our analysis is limited to header information required to identify potential subscriptions.
          </p>
          <p>
            We use this limited data exclusively to identify and manage your subscriptions within the TidyMail app.
            <strong className="text-foreground"> We do not sell your data or use it for advertising.</strong>
            Your data is stored securely.
          </p>
          <p>
            You can request the deletion of your account and associated data at any time.
            For full details, please review our complete
            <Link href="/terms-and-privacy" className="underline text-primary ml-1" target="_blank" rel="noopener noreferrer">
              Terms of Service and Privacy Policy
            </Link>.
          </p>
        </div>
      </ScrollArea>

      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I acknowledge I have reviewed the summary and agree to the full Terms of Service.
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
            I acknowledge I have reviewed the summary and agree to the full Privacy Policy.
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8">
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
    </motion.div>
  );
}

