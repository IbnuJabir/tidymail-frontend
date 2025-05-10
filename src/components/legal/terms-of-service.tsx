"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function TermsOfService() {
  // You can replace this with a dynamic date or keep it static
  const lastUpdatedDate = "May 3, 2025"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdatedDate}</p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card className="p-6">
              <p className="text-lg font-medium mb-4">
                Welcome to TidyMail. By using our service, you agree to these terms.
              </p>
              <p className="text-muted-foreground">
                This document outlines your rights and responsibilities when using TidyMail. Please read it carefully.
              </p>
            </Card>

            {/* Service Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  1
                </span>
                Service Description
              </h2>
              <div className="ml-11">
                <p className="mb-4">TidyMail helps you manage your email inbox by:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Identifying and organizing email subscriptions</li>
                  <li>Providing tools to unsubscribe from unwanted emails</li>
                  <li>Helping you clean up and organize your inbox</li>
                </ul>
              </div>
            </section>

            {/* Account Access */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  2
                </span>
                Account Access and Data Usage
              </h2>
              <div className="ml-11">
                <p className="mb-4">To provide our service:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>You grant us permission to access your email account via secure authentication (OAuth)</li>
                  <li>We analyze email header information (sender details) to identify subscriptions</li>
                  <li>
                    <strong>We do not read, store, or analyze the content of your emails</strong>
                  </li>
                  <li>Our processing is limited to metadata required for subscription management</li>
                </ul>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  3
                </span>
                Your Responsibilities
              </h2>
              <div className="ml-11">
                <p className="mb-4">As a TidyMail user, you are responsible for:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>Using TidyMail only for lawful purposes</li>
                  <li>The consequences of actions taken within the app (unsubscribing, deleting messages)</li>
                  <li>Complying with these Terms of Service</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  4
                </span>
                Intellectual Property
              </h2>
              <div className="ml-11">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>TidyMail and its features remain our exclusive property</li>
                  <li>You retain full ownership of your personal data and email information</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  5
                </span>
                Termination
              </h2>
              <div className="ml-11">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>We may terminate access for any reason, including Terms violations</li>
                  <li>You may stop using the service at any time</li>
                  <li>You can request data deletion as outlined in our Privacy Policy</li>
                </ul>
              </div>
            </section>

            {/* Disclaimers and Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  6
                </span>
                Disclaimers and Liability
              </h2>
              <div className="ml-11">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>The service is provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo;</li>
                  <li>We disclaim all warranties, express or implied</li>
                  <li>
                    We are not liable for indirect, incidental, special, consequential, or punitive damages resulting
                    from your use of the service
                  </li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">
                  7
                </span>
                Changes to Terms
              </h2>
              <div className="ml-11">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>We may modify these Terms at our discretion</li>
                  <li>Material changes will be communicated with at least 30 days notice</li>
                  <li>Continued use after changes constitutes acceptance</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at:{" "}
                <Link href="mailto:tidymailsupport@ibnujabir.tech" className="text-primary hover:underline">
                  tidymailsupport@ibnujabir.tech
                </Link>
              </p>
            </section>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
              <Link href="/privacy">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Privacy Policy
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full sm:w-auto"
              >
                Back to Top
                <ChevronRight className="ml-2 h-4 w-4 rotate-[-90deg]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
