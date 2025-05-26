"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { analyzeSubscriptionBatch } from "@/services/email-service";
import type {
  AnalysisBatchResult,
  AnalysisProgressResponse,
} from "@/types/email";
import { useMutation } from "@tanstack/react-query";

export default function CompletePage() {
  const router = useRouter();

  // Set onboarding completion flag in localStorage
  useEffect(() => {
    localStorage.setItem("onboardingComplete", "true");
  }, []);

  const [startAnalysis, setStartAnalysis] = useState(false);
  const [analysisProgress, setAnalysisProgress] =
    useState<AnalysisProgressResponse>({
      totalProcessed: 0,
      totalNewSubscriptions: 0,
      isComplete: false,
      error: null,
    });

  // State to track current batch processing
  const [currentBatch, setCurrentBatch] = useState({
    pageToken: null as string | null,
    isProcessing: false,
  });

  // Replace useQuery with useMutation
  const { mutate: processBatch, isPending: isProcessing } = useMutation({
    mutationFn: (pageToken: string | null) =>
      analyzeSubscriptionBatch(pageToken, 100),
    onSuccess: (data: AnalysisBatchResult) => {
      if (!data) return;

      setAnalysisProgress((prev) => ({
        totalProcessed: prev.totalProcessed + data.data.processed_count,
        totalNewSubscriptions:
          prev.totalNewSubscriptions + data.data.new_subscriptions,
        isComplete: data.data.is_complete,
        error: null,
      }));

      if (!data.data.is_complete && data.data.next_page_token) {
        setTimeout(() => {
          setCurrentBatch({
            pageToken: data.data.next_page_token,
            isProcessing: true,
          });
          processBatch(data.data.next_page_token);
        }, 100);
      } else {
        setCurrentBatch({ pageToken: null, isProcessing: false });
      }
    },
    onError: (error: Error) => {
      console.error("Error processing batch:", error);
      setAnalysisProgress((prev) => ({
        ...prev,
        error: (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
                (error instanceof Error ? error.message : "An unknown error occurred"),
      }));
      setCurrentBatch({ pageToken: null, isProcessing: false });
    },
  });

  // Start the analysis when requested
  useEffect(() => {
    if (
      startAnalysis &&
      !currentBatch.isProcessing &&
      !analysisProgress.isComplete &&
      !analysisProgress.error
    ) {
      setCurrentBatch({ pageToken: null, isProcessing: true });
    }
  }, [
    startAnalysis,
    currentBatch.isProcessing,
    analysisProgress.isComplete,
    analysisProgress.error,
  ]);

  const handleAnalyze = () => {
    processBatch(currentBatch.pageToken);
    setStartAnalysis(true);
  };
  const goToDashboard = () => router.push("/dashboard");

  const retryAnalysis = () => {
    // Reset all states
    processBatch(currentBatch.pageToken);
    setAnalysisProgress({
      totalProcessed: 0,
      totalNewSubscriptions: 0,
      isComplete: false,
      error: null,
    });

    // Reset batch state
    setCurrentBatch({ pageToken: null, isProcessing: false });

    // Force a small delay before restarting to ensure state updates are processed
    setTimeout(() => {
      // This will trigger the useEffect to start processing again
      setStartAnalysis(false);
      setTimeout(() => {
        setStartAnalysis(true);
      }, 50);
    }, 50);
  };

  // More accurate progress estimation
  const progressPercentage =
    analysisProgress.totalProcessed > 0
      ? Math.min(
          Math.floor(
            (analysisProgress.totalProcessed /
              (analysisProgress.totalProcessed + 100)) *
              100
          ),
          99
        )
      : 0;

  // const isProcessing = currentBatch.isProcessing || processBatchQuery.isFetching

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
      ) : isProcessing ||
        (!analysisProgress.isComplete &&
          startAnalysis &&
          !analysisProgress.error) ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto flex flex-col items-center text-center max-w-md"
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

          {/* Progress indicators */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              Processing emails: {analysisProgress.totalProcessed} processed
            </span>
          </div>

          {analysisProgress.totalNewSubscriptions > 0 && (
            <div className="text-sm text-green-600 mb-4">
              Found {analysisProgress.totalNewSubscriptions} new subscriptions
            </div>
          )}
        </motion.div>
      ) : analysisProgress.error ? (
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
            {analysisProgress.error}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Button onClick={retryAnalysis} variant="outline" className="mr-2">
              Try Again
            </Button>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center max-w-md mx-auto"
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

          <p className="text-muted-foreground mb-4">
            We&apos;ve successfully analyzed your inbox and identified all your
            subscriptions. You can now manage them from your dashboard and take
            control of your inbox.
          </p>

          <div className="bg-green-50 p-4 rounded-md mb-8 w-full">
            <p className="font-medium text-green-700">
              Processed {analysisProgress.totalProcessed} emails
            </p>
            <p className="font-medium text-green-700">
              Found {analysisProgress.totalNewSubscriptions} subscriptions
            </p>
          </div>

          <Button onClick={goToDashboard} size="lg">
            Go to Dashboard
          </Button>
        </motion.div>
      )}
    </div>
  );
}
