"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [randomMessage, setRandomMessage] = useState("");

  const messages = [
    "Houston, we have a problem. This page doesn't exist.",
    "Looks like you've ventured into uncharted territory!",
    "404: Plot twist! The page was never here.",
    "This page is like a unicorn - it doesn't exist.",
    "Oops! This page has gone on vacation without leaving a forwarding address.",
    "Well, this is awkward. The page you're looking for is ghosting us.",
    "404: Page not found. It probably went to get coffee.",
    "404: This page is on a secret mission and forgot to tell us where it went.",
  ];

  useEffect(() => {
    setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-24 text-center">
      <div className="max-w-3xl">
        <div className="mb-8 flex justify-center ">
          <div className="relative p-4">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20"></div>
            <h1 className="relative text-[150px] font-extrabold tracking-tighter text-primary sm:text-[200px]">
              404
            </h1>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mb-6 text-xl text-muted-foreground">{randomMessage}</p>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h3 className="mb-2 text-lg font-medium">Lost?</h3>
          <p className="text-muted-foreground">
            You might want to check if you typed the URL correctly or go back to
            our homepage to start fresh.
          </p>
        </div>
      </div>
    </div>
  );
}
