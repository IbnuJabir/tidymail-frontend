"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  // Check if the user has completed onboarding
  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete")

    // If onboarding is not complete, redirect to onboarding
    if (!onboardingComplete) {
      router.push("/onboarding")
    }
  }, [router])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome to TidyMail</h1>
      <p>Select an option from the sidebar to get started.</p>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-8">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
    </div>
  )
}
