"use client";

import type React from "react";
import { Progress } from "@/components/ui/progress"; // Assuming you have a Progress component
import { usePathname } from "next/navigation"; // Needed to determine progress

// Define the sequence of onboarding steps
const onboardingSteps = [
  "/onboarding",
  "/onboarding/disclaimer",
  "/onboarding/terms",
  "/onboarding/features",
  "/onboarding/tutorial",
  "/onboarding/complete",
];

// This is a separate layout for the onboarding flow without the sidebar
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStepIndex = onboardingSteps.indexOf(pathname);
  const progress = currentStepIndex >= 0 ? ((currentStepIndex + 1) / onboardingSteps.length) * 100 : 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <div className="w-full max-w-3xl rounded-xl border bg-card p-6 shadow-lg">
        {/* Progress Bar */} 
        <div className="mb-6">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            Step {currentStepIndex + 1} of {onboardingSteps.length}
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          {/* Consider adding an animation here later */}
          <h1 className="text-3xl font-bold">TidyMail</h1>
        </div>
        {/* Add subtle fade-in animation to children? Requires motion library like framer-motion */}
        {children}
      </div>
    </div>
  );
}

