import { LoginForm } from "@/components/login-form"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Login | TidyMail",
  description: "Login to TidyMail to manage your email subscriptions",
}
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <LoginForm />
    </div>
  )
}
