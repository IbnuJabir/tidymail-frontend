import type React from "react"
// This is a separate layout for the onboarding flow without the sidebar
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <div className="w-full max-w-3xl rounded-xl border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold">TidyMail</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
