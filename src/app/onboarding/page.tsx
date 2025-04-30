"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { analyseSubcription } from "@/services/email-service";

export default function OnboardingStart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-6">Welcome to TidyMail</h2>
      <p className="text-muted-foreground mb-8">
        Let's get you set up with your email organization assistant. We'll walk
        you through the features and get your consent for the necessary
        permissions.
      </p>
      <div className="flex flex-col items-center gap-4">
        <img
          src="/placeholder.svg?height=200&width=200"
          alt="TidyMail Logo"
          className="rounded-full bg-primary/10 p-4 mb-4"
          width={200}
          height={200}
        />
        <p className="text-lg font-medium">Your personal email assistant</p>
        <p className="text-muted-foreground mb-6">
          Clean up your inbox, manage subscriptions, and take control of your
          email
        </p>
        <Button
          onClick={() => {
            router.push("/onboarding/disclaimer");
            analyseSubcription();
          }}
          className="gap-2"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
