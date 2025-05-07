"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsAndPrivacyPage() {
  // You can replace this with a dynamic date or keep it static
  const lastUpdatedDate = "May 3, 2025";
  const [activeSection, setActiveSection] = useState<string>("terms");
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const sections = ["terms-of-services", "privacy-policy"];

    const checkActiveSection = () => {
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", checkActiveSection);
    return () => window.removeEventListener("scroll", checkActiveSection);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Terms of Service & Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdatedDate}
            </p>
          </div>

          {/* Navigation */}
          <div
            className={`sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b mb-8 ${
              scrollPosition > 200 ? "shadow-sm" : ""
            }`}
          >
            <nav className="flex space-x-6">
              <button
                onClick={() => scrollToSection("terms-of-services")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeSection === "terms-of-services"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => scrollToSection("privacy-policy")}
                className={`text-sm font-medium pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeSection === "privacy-policy"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Privacy Policy
              </button>
            </nav>
          </div>

          {/* Terms of Service */}
          <section id="terms-of-services" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              Terms of Service
            </h2>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Welcome to TidyMail. By accessing or using our Service, you
                agree to be bound by these Terms of Service. Please read them
                carefully.
              </p>

              <h3>1. Service Description</h3>
              <p>
                TidyMail is designed to help you manage your email inbox,
                primarily by identifying and organizing email subscriptions. To
                provide this Service, TidyMail requires access to your connected
                email account(s).
              </p>

              <h3>2. Account Access and Data Usage</h3>
              <p>
                To use TidyMail, you must grant us permission to access your
                email account via secure authentication methods (e.g., OAuth).
                Our access is limited and specifically tailored to perform the
                functions of the Service. We analyze email header information
                (sender name, email address, domain) to identify potential
                subscriptions.{" "}
                <strong>
                  We do not access, read, store, or analyze the content (body)
                  of your emails.
                </strong>{" "}
                Our data processing is strictly limited to the metadata required
                for subscription identification and management.
              </p>

              <h3>3. User Responsibilities</h3>
              <p>
                You are responsible for maintaining the confidentiality of your
                email account credentials and for all activities that occur
                under your account. You agree to use TidyMail only for lawful
                purposes and in accordance with these Terms. You are responsible
                for the consequences of actions taken within the TidyMail
                application, such as unsubscribing from emails or deleting
                messages.
              </p>

              <h3>4. Intellectual Property</h3>
              <p>
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of
                TidyMail and its licensors. You retain full ownership of your
                personal data, including your email information.
              </p>

              <h3>5. Termination</h3>
              <p>
                We may terminate or suspend your access to our Service
                immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the
                Terms. You may stop using the Service at any time and can
                request data deletion as outlined in our Privacy Policy.
              </p>

              <h3>6. Disclaimer of Warranties</h3>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
                We disclaim all warranties of any kind, whether express or
                implied, including, but not limited to, implied warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>

              <h3>7. Limitation of Liability</h3>
              <p>
                In no event shall TidyMail, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                access to or use of or inability to access or use the Service.
              </p>

              <h3>9. Changes to Terms</h3>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will provide at least 30 days notice prior to any new terms
                taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy-policy" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              Privacy Policy
            </h2>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                This Privacy Policy describes how TidyMail collects, uses, and
                protects your information when you use our Service.
              </p>

              <h3>1. Information We Collect</h3>
              <p>
                When you connect your email account to TidyMail, we collect the
                following types of information solely for the purpose of
                providing the Service:
              </p>
              <ul>
                <li>
                  <strong>Subscription Metadata:</strong> Sender email
                  addresses, sender names (if available), and domain names
                  extracted from email headers to identify subscriptions.
                </li>
                <li>
                  <strong>Account Information:</strong> Basic account details
                  required for authentication and service operation (e.g., your
                  email address used for login, connection tokens).
                </li>
                <li>
                  <strong>Usage Data:</strong> Anonymized data about how you
                  interact with the TidyMail application (e.g., features used,
                  buttons clicked) to help us improve the Service. This does not
                  include any personal email data.
                </li>
              </ul>
              <p>
                <strong>
                  We explicitly DO NOT collect, store, or analyze:
                </strong>
              </p>
              <ul>
                <li>The content (body) of your emails.</li>
                <li>Attachments in your emails.</li>
                <li>
                  Recipient information (To, Cc, Bcc fields) unless it's the
                  sender address itself being analyzed for subscription
                  purposes.
                </li>
                <li>
                  Any personal information beyond what is strictly necessary for
                  subscription identification and account management.
                </li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>
                The information we collect is used exclusively for the following
                purposes:
              </p>
              <ul>
                <li>
                  To identify and display potential email subscriptions within
                  the TidyMail application.
                </li>
                <li>
                  To enable you to manage these subscriptions (e.g.,
                  unsubscribe, delete related emails).
                </li>
                <li>To operate, maintain, and improve the TidyMail Service.</li>
                <li>To provide customer support.</li>
                <li>To ensure the security of our Service.</li>
              </ul>
              <p>
                <strong>
                  We do not sell, rent, or share your personal information or
                  collected subscription metadata with third parties for
                  marketing or advertising purposes.
                </strong>
              </p>

              <h3>3. Data Security</h3>
              <p>
                We implement industry-standard security measures to protect your
                information from unauthorized access, alteration, disclosure, or
                destruction. This includes secure authentication protocols
                (OAuth), encryption of sensitive data both in transit and at
                rest, and access controls.
              </p>

              <h3>4. Data Retention and Deletion</h3>
              <p>
                We retain your subscription metadata only as long as necessary
                to provide the Service to you or until you request deletion. You
                can request the deletion of your account and all associated data
                at any time by contacting us at{" "}
                <a href="mailto:tidymailsupport@ibnujabir.tech" className="text-primary hover:underline">
                  here
                </a>{" "}
                or through the account settings within your dashboard. Upon
                receiving a deletion request, we will permanently delete your
                data from our systems within a reasonable timeframe, subject to
                any legal obligations.
              </p>

              <h3>5. Third-Party Services</h3>
              <p>
                We may use third-party services for authentication (e.g., Google
                OAuth, Microsoft OAuth) or analytics (using anonymized data).
                These services have their own privacy policies governing their
                use of information.
              </p>

              <h3>6. Children's Privacy</h3>
              <p>
                Our Service is not intended for use by children under the age of
                13. We do not knowingly collect personal information from
                children under this age.
              </p>

              <h3>7. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>

              <h3>8. Contact Us</h3>
              <p>
                If you have any questions about these Terms or the Privacy
                Policy, please contact us:{" "}
                <Link href="mailto:tidymailsupport@ibnujabir.tech" className="text-primary hover:underline">
                  TidyMail Support
                </Link>
              </p>
            </div>
          </section>

          {/* Back to top button */}
          <div className="text-center mt-12 mb-8">
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center"
            >
              Back to Top
              <ChevronRight className="ml-2 h-4 w-4 rotate-[-90deg]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
