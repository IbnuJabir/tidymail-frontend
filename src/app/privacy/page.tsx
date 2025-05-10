import { Metadata } from "next"
import { PrivacyPolicy } from "@/components/legal/privacy-policy"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | TidyMail",
  description: "How TidyMail collects, uses, and protects your information",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </>
  )
}
