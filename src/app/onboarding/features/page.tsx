"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Mail, UserRound, Trash, Trash2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion"; // Added for animations

export default function FeaturesPage() {
  const router = useRouter();

  const features = [
    {
      title: "Subscription Overview", // Renamed for clarity
      description: "View and manage all your subscriptions in one place.",
      icon: Mail,
    },
    {
      title: "Easy Unsubscribe", // Renamed
      description: "Quickly unsubscribe from unwanted email lists.",
      icon: UserRound, // Consider a more fitting icon like MailX or UserMinus?
    },
    {
      title: "Bulk Trash", // Renamed
      description: "Move emails from selected senders to trash, with easy restoration.",
      icon: Trash,
    },
    {
      title: "Bulk Permanent Deletion",
      description: "Permanently delete emails from specific senders.",
      icon: Trash2,
    },
    {
      title: "Re-subscribe Option", // Renamed
      description: "Subscribe back to services if you unsubscribed accidentally.",
      icon: RefreshCw,
    },
  ];

  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger animation
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }} // Add hover effect
          >
            <Card className="h-full"> {/* Ensure cards have same height */}
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <feature.icon className="h-5 w-5 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => router.push("/onboarding/terms")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => router.push("/onboarding/tutorial")} className="gap-2">
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

