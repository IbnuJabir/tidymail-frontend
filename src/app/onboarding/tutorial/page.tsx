"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { motion } from "framer-motion"; // Added for animations

export default function TutorialPage() {
  const router = useRouter();

  const tutorials = [
    // Removed the commented-out 'emails' section as per original code
    {
      id: "subscriptions",
      title: "Manage Subscriptions", // Slightly clearer title
      steps: [
        "View all subscriptions listed clearly.",
        "Unsubscribe from unwanted emails with a single click.",
        "Optionally move subscription emails to trash or delete permanently.",
        "Filter subscriptions easily by name, email, or domain.",
      ],
      image: "/placeholder.svg?height=200&width=400", // Replace with actual relevant image
    },
    {
      id: "actions",
      title: "Perform Bulk Actions", // Slightly clearer title
      steps: [
        "Select multiple subscriptions or emails using checkboxes.",
        "Use the bulk action buttons (e.g., Unsubscribe, Trash).",
        "Confirm your actions in the confirmation dialog.",
        "Track the status of bulk actions easily.",
      ],
      image: "/placeholder.svg?height=200&width=400", // Replace with actual relevant image
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">How to Use TidyMail</h2>

      <Tabs defaultValue={tutorials[0].id} className="mb-8 w-full">
        <TabsList className="grid w-full grid-cols-2"> {/* Adjusted grid-cols */}
          {tutorials.map((tutorial) => (
            <TabsTrigger key={tutorial.id} value={tutorial.id}>
              {tutorial.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tutorials.map((tutorial) => (
          <TabsContent key={tutorial.id} value={tutorial.id} className="mt-6">
            {/* Added animation to content switching */}
            <motion.div
              key={tutorial.id} // Ensure animation triggers on tab change
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center my-4">
                <Image
                  src={tutorial.image || "/placeholder.svg"}
                  alt={tutorial.title}
                  width={400}
                  height={200}
                  className="rounded-md border shadow-sm bg-muted/10"
                />
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                {tutorial.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => router.push("/onboarding/features")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => router.push("/onboarding/complete")} className="gap-2">
          Finish Setup <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

