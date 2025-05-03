"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion"; // Added for animations

export default function CompletePage() {
  const router = useRouter();

  // Set onboarding completion flag in localStorage
  useEffect(() => {
    localStorage.setItem("onboardingComplete", "true");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="flex flex-col items-center text-center"
    >
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", bounce: 0.5 }}
        className="rounded-full bg-primary/10 p-4 mb-6 inline-block"
      >
        <CheckCircle className="h-12 w-12 text-primary" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-4">You&apos;re All Set!</h2>

      <p className="text-muted-foreground mb-8 max-w-md">
        Thank you for completing the onboarding process. You&apos;re now ready to start using TidyMail to organize your
        emails and manage your subscriptions effectively.
      </p>

      <Button onClick={() => router.push("/subscriptions")} size="lg">
        Go to Dashboard
      </Button>
    </motion.div>
  );
}

