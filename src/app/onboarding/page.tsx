"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import { analyseSubcription } from "@/services/email-service";
import Image from "next/image";
import { motion } from "framer-motion";
import welcomeOnboarding from "@/assets/welcomeonboard.png";
export default function OnboardingStart() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center"
    >
      <h2 className="text-2xl font-bold mb-6">Welcome to TidyMail</h2>
      <p className="text-muted-foreground mb-8">
        Let&apos;s get you set up with your email organization assistant.
        We&apos;ll walk you through the features and get your consent for the
        necessary permissions.
      </p>
      <div className="flex flex-col items-center gap-4">
        {/* Added a subtle animation to the image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={welcomeOnboarding}
            alt="TidyMail Logo"
            className="rounded-full bg-primary/10 p-4 mb-4 shadow-md"
            width={250}
            height={250}
          />
        </motion.div>
        <p className="text-lg font-medium">Your personal email assistant</p>
        <p className="text-muted-foreground mb-6">
          Clean up your inbox, manage subscriptions, and take control of your
          email
        </p>
        <Button
          onClick={() => {
            router.push("/onboarding/disclaimer");
            // Consider if analyseSubcription() should be called here or later
            // analyseSubcription();
          }}
          className="gap-2"
          size="lg"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
