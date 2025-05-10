"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SuccessCard() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)

    const interval = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(interval)
        return
      }
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [router])

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">Payment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Thank you for your subscription. Your payment has been processed successfully.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Redirecting to dashboard in <span className="font-medium text-primary">{countdown}</span> seconds...
          </p>
          <Progress value={(5 - countdown) * 20} className="h-2 bg-primary/10" />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push("/dashboard")} className="w-full">
          Go to Dashboard Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
