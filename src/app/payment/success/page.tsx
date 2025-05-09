import type { Metadata } from "next"
import SuccessCard from "@/components/success-card"

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your subscription payment was successful",
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <SuccessCard />
    </div>
  )
}
