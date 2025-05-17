import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import {
  analyzeSubscriptionBatch,
  getSubscriptions,
} from "@/services/email-service";
import type {
  AnalysisBatchResult,
  AnalysisProgressResponse,
} from "@/types/email";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function SyncButton() {

  const [open, setOpen] = useState(false);

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
      analyzeSubscriptionBatch(pageToken, 100, true),
    onSuccess: (data: AnalysisBatchResult) => {
      if (!data) return;

      setAnalysisProgress((prev) => ({
        totalProcessed: prev.totalProcessed + data.data.processed_count,
        totalNewSubscriptions:
          prev.totalNewSubscriptions + data.data.new_subscriptions,
        isComplete: data.data.is_complete,
        error: null,
      }));

      if (
        !data.data.is_complete &&
        data.data.next_page_token &&
        analysisProgress.totalProcessed < 200
      ) {
        setCurrentBatch({
          pageToken: data.data.next_page_token,
          isProcessing: true,
        });
        processBatch(data.data.next_page_token);
      } else if (!data.data.is_complete && data.data.next_page_token) {
        setTimeout(() => {
          setCurrentBatch({
            pageToken: data.data.next_page_token,
            isProcessing: true,
          });
          processBatch(data.data.next_page_token);
        }, 100);
      } else {
        setCurrentBatch({ pageToken: null, isProcessing: false });
        getSubscriptions();
        toast.success("Analysis Completed!", {
          description: `Processed ${analysisProgress.totalProcessed} emails and found ${analysisProgress.totalNewSubscriptions} new subscriptions.`,
        });
      }
    },
    onError: (error: Error) => {
      console.error("Error processing batch:", error);
      setAnalysisProgress((prev) => ({
        ...prev,
        error: error.message,
      }));
      setCurrentBatch({ pageToken: null, isProcessing: false });
      toast.error("Failed to Analyze your subsbscription", {
              description:
                (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
                (error instanceof Error ? error.message : "An unknown error occurred"),
            });
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
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={
            !analysisProgress.isComplete &&
            startAnalysis &&
            !analysisProgress.error
          }
        >
          {isProcessing ||
          (!analysisProgress.isComplete &&
            startAnalysis &&
            !analysisProgress.error) ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          <span className="hidden sm:inline">Sync</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Analyze Subscriptions?</DialogTitle>
          <DialogDescription>
            This will scan your inbox and analyze your subscriptions. Do you
            want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAnalyze}>Yes, Analyze</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
