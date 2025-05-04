"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Mail} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { analyseSubcription } from "@/services/email-service";

export default function CompletePage() {
  const router = useRouter();

  // Set onboarding completion flag in localStorage
  useEffect(() => {
    localStorage.setItem("onboardingComplete", "true");
  }, []);

  const [startAnalysis, setStartAnalysis] = useState(false);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["analyze-subscription"],
    queryFn: analyseSubcription,
    enabled: startAnalysis,
    retry: false,
  });

  const handleAnalyze = () => setStartAnalysis(true);
  const goToDashboard = () => router.push("/subscriptions");

  return (
    <div>
      {!startAnalysis ? (
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
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              bounce: 0.5,
            }}
            className="rounded-full bg-primary/10 p-4 mb-6 inline-block"
          >
            <CheckCircle className="h-12 w-12 text-primary" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">You&apos;re All Set!</h2>

          <p className="text-muted-foreground mb-8 max-w-md">
            Thank you for completing the onboarding process. You&apos;re now
            ready to start using TidyMail to organize your emails and manage
            your subscriptions effectively.
          </p>

          <Button onClick={handleAnalyze} size="lg">
            Analyze Your Subscriptions
          </Button>
        </motion.div>
      ) : isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <div className="relative mb-8">
            {/* Animated envelope with scanning effect */}
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <Mail className="h-20 w-20 text-primary" strokeWidth={1.5} />

              {/* Scanning line animation */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-primary/60 rounded-full"
                initial={{ top: "0%" }}
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Orbiting particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-primary/80"
                animate={{
                  x: Math.cos((i * (Math.PI * 2)) / 3) * 50,
                  y: Math.sin((i * (Math.PI * 2)) / 3) * 50,
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  delay: i * 0.5,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Analyzing Your Subscriptions
          </h2>

          <p className="text-muted-foreground mb-6">
            We&apos;re scanning your inbox to identify and organize all your
            subscriptions. This may take a moment depending on the size of your
            inbox.
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing your emails...</span>
          </div>
        </motion.div>
      ) : isError ? (
        <div className="mx-auto flex flex-col items-center text-center max-w-md">
          <div className="rounded-full bg-red-100 p-4 mb-6 inline-block">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-4">Analysis Failed</h2>

          <p className="text-muted-foreground mb-6">
            We encountered an error while analyzing your subscriptions.
          </p>

          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 mb-6">
            {(error as Error).message}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Button
              onClick={() => {
                setStartAnalysis(false);
                setTimeout(() => setStartAnalysis(true), 100);
              }}
              variant="outline"
              className="mr-2"
            >
              Try Again
            </Button>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              bounce: 0.5,
            }}
            className="rounded-full bg-green-100 p-4 mb-6 inline-block"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">Analysis Complete!</h2>

          <p className="text-muted-foreground mb-8">
            We&apos;ve successfully analyzed your inbox and identified all your
            subscriptions. You can now manage them from your dashboard and take
            control of your inbox.
          </p>

          <Button onClick={goToDashboard} size="lg">
            Go to Dashboard
          </Button>
        </motion.div>
      )}
    </div>
  );
}
