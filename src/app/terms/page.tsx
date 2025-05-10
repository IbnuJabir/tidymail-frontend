import type { Metadata } from "next"
import { TermsOfService } from "@/components/legal/terms-of-service"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Terms of Service | TidyMail",
  description: "Terms and conditions for using the TidyMail service",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <TermsOfService />
      <Footer />
    </>
  )
}
