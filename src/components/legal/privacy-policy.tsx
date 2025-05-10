"use client"

import Link from "next/link"
import { ChevronRight, Shield, Eye, Lock, Clock, Server, BabyIcon as Child, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function PrivacyPolicy() {
  // You can replace this with a dynamic date or keep it static
  const lastUpdatedDate = "May 3, 2025"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdatedDate}</p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card className="p-6">
              <p className="text-lg font-medium mb-4">
                TidyMail is committed to protecting your privacy and data security.
              </p>
              <p className="text-muted-foreground">
                This policy explains how we collect, use, and protect your information when you use our service.
              </p>
            </Card>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Eye className="text-primary mr-3 h-6 w-6" />
                Information We Collect
              </h2>
              <div className="ml-9">
                <p className="mb-4">We collect only what's necessary to provide our service:</p>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">✓ Subscription Metadata</h3>
                    <p className="text-muted-foreground text-sm">
                      Sender email addresses, sender names, and domain names from email headers to identify
                      subscriptions
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">✓ Account Information</h3>
                    <p className="text-muted-foreground text-sm">
                      Basic account details required for authentication (email address, connection tokens)
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">✓ Usage Data</h3>
                    <p className="text-muted-foreground text-sm">
                      Anonymized data about how you interact with the TidyMail application to help us improve
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-100 dark:border-red-900">
                  <h3 className="font-medium mb-2 text-red-600 dark:text-red-400">We DO NOT collect:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-600/80 dark:text-red-400/80 text-sm">
                    <li>The content (body) of your emails</li>
                    <li>Attachments in your emails</li>
                    <li>Recipient information (To, Cc, Bcc fields)</li>
                    <li>Any personal information beyond what's necessary for the service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <FileText className="text-primary mr-3 h-6 w-6" />
                How We Use Your Information
              </h2>
              <div className="ml-9">
                <p className="mb-4">Your information is used exclusively for:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Identifying and displaying email subscriptions</li>
                  <li>Enabling subscription management (unsubscribe, delete)</li>
                  <li>Operating and improving the TidyMail service</li>
                  <li>Providing customer support</li>
                  <li>Ensuring service security</li>
                </ul>

                <div className="mt-4 p-3 bg-primary/10 rounded-lg inline-block">
                  <p className="font-medium text-sm">
                    We do not sell, rent, or share your information with third parties for marketing purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Lock className="text-primary mr-3 h-6 w-6" />
                Data Security
              </h2>
              <div className="ml-9">
                <p className="mb-4">We protect your data with:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Secure authentication protocols (OAuth)</li>
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Strict access controls and security monitoring</li>
                  <li>Regular security assessments</li>
                </ul>
              </div>
            </section>

            {/* Data Retention */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Clock className="text-primary mr-3 h-6 w-6" />
                Data Retention and Deletion
              </h2>
              <div className="ml-9">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>We retain your data only as long as necessary to provide the service</li>
                  <li>
                    You can request deletion of your account and data at any time by contacting{" "}
                    <Link href="mailto:tidymailsupport@ibnujabir.tech" className="text-primary hover:underline">
                      tidymailsupport@ibnujabir.tech
                    </Link>
                  </li>
                  <li>Upon request, we'll permanently delete your data within a reasonable timeframe</li>
                </ul>
              </div>
            </section>

            {/* Third-Party Services */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Server className="text-primary mr-3 h-6 w-6" />
                Third-Party Services
              </h2>
              <div className="ml-9">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>We use third-party services for authentication (Google OAuth, Microsoft OAuth)</li>
                  <li>We may use analytics services with anonymized data</li>
                  <li>These services have their own privacy policies</li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Child className="text-primary mr-3 h-6 w-6" />
                Children's Privacy
              </h2>
              <div className="ml-9">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Our service is not intended for children under 13</li>
                  <li>We do not knowingly collect information from children under 13</li>
                </ul>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Shield className="text-primary mr-3 h-6 w-6" />
                Changes to This Policy
              </h2>
              <div className="ml-9">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>We may update our Privacy Policy periodically</li>
                  <li>We'll notify you of any changes by posting the new policy</li>
                  <li>We recommend reviewing this policy regularly</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center">
                <Mail className="text-primary mr-3 h-5 w-5" />
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about our Privacy Policy, please contact us at:{" "}
                <Link href="mailto:tidymailsupport@ibnujabir.tech" className="text-primary hover:underline">
                  tidymailsupport@ibnujabir.tech
                </Link>
              </p>
            </section>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
              <Link href="/terms">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Terms of Service
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
