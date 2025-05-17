"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function DashboardNotFound() {
  const [randomMessage, setRandomMessage] = useState("")

  const messages = [
    "Oops! This page has gone on vacation without leaving a forwarding address.",
    "Well, this is awkward. The page you're looking for is ghosting us.",
    "404: Page not found. It probably went to get coffee.",
    "Looks like you've ventured into uncharted territory!",
    "This page is like a unicorn - it doesn't exist.",
    "404: Plot twist! The page was never here.",
    "404: This page is on a secret mission and forgot to tell us where it went.",
  ]

  useEffect(() => {
    setRandomMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  return (
    <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center px-4 py-24 text-center">
      <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted">
        <div className="absolute animate-ping rounded-full bg-primary/50 h-40 w-40 opacity-75"></div>
        <Search className="h-20 w-20 text-primary" />
      </div>
      <h1 className="mt-8 text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">{randomMessage}</p>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
      </p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg" className="gap-2">
          <Link href="/dashboard">
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
