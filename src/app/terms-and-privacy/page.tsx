// app/terms-and-privacy/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TermsAndPrivacyPage() {
  // You can replace this with a dynamic date or keep it static
  const lastUpdatedDate = "May 3, 2025";

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8 text-center">
        TidyMail Terms of Service & Privacy Policy
      </h1>
      <p className="text-center text-muted-foreground mb-10">
        Last Updated: {lastUpdatedDate}
      </p>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to TidyMail. By accessing or using our Service, you agree to
            be bound by these Terms of Service. Please read them carefully.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            1. Service Description
          </h3>
          <p>
            TidyMail is designed to help you manage your email inbox, primarily
            by identifying and organizing email subscriptions. To provide this
            Service, TidyMail requires access to your connected email
            account(s).
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            2. Account Access and Data Usage
          </h3>
          <p>
            To use TidyMail, you must grant us permission to access your email
            account via secure authentication methods (e.g., OAuth). Our access
            is limited and specifically tailored to perform the functions of the
            Service. We analyze email header information (sender name, email
            address, domain) to identify potential subscriptions.{" "}
            <strong className="text-foreground">
              We do not access, read, store, or analyze the content (body) of
              your emails.
            </strong>{" "}
            Our data processing is strictly limited to the metadata required for
            subscription identification and management.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            3. User Responsibilities
          </h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            email account credentials and for all activities that occur under
            your account. You agree to use TidyMail only for lawful purposes and
            in accordance with these Terms. You are responsible for the
            consequences of actions taken within the TidyMail application, such
            as unsubscribing from emails or deleting messages.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            4. Intellectual Property
          </h3>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of TidyMail and its
            licensors. You retain full ownership of your personal data,
            including your email information.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            5. Termination
          </h3>
          <p>
            We may terminate or suspend your access to our Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms. You may stop
            using the Service at any time and can request data deletion as
            outlined in our Privacy Policy.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            6. Disclaimer of Warranties
          </h3>
          <p>
            The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS
            AVAILABLE&rdquo; basis. We disclaim all warranties of any kind,
            whether express or implied, including, but not limited to, implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            7. Limitation of Liability
          </h3>
          <p>
            In no event shall TidyMail, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the Service.
          </p>

          {/* <h3 className="font-semibold text-lg text-foreground pt-4">8. Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction, e.g., State of California, USA], without regard to its conflict of law provisions.
          </p> */}

          <h3 className="font-semibold text-lg text-foreground pt-4">
            9. Changes to Terms
          </h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole
            discretion.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            This Privacy Policy describes how TidyMail collects, uses, and
            protects your information when you use our Service.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            1. Information We Collect
          </h3>
          <p>
            When you connect your email account to TidyMail, we collect the
            following types of information solely for the purpose of providing
            the Service:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong className="text-foreground">
                Subscription Metadata:
              </strong>{" "}
              Sender email addresses, sender names (if available), and domain
              names extracted from email headers to identify subscriptions.
            </li>
            <li>
              <strong className="text-foreground">Account Information:</strong>{" "}
              Basic account details required for authentication and service
              operation (e.g., your email address used for login, connection
              tokens).
            </li>
            <li>
              <strong className="text-foreground">Usage Data:</strong>{" "}
              Anonymized data about how you interact with the TidyMail
              application (e.g., features used, buttons clicked) to help us
              improve the Service. This does not include any personal email
              data.
            </li>
          </ul>
          <p className="mt-2">
            <strong className="text-foreground">
              We explicitly DO NOT collect, store, or analyze:
            </strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The content (body) of your emails.</li>
            <li>Attachments in your emails.</li>
            <li>
              Recipient information (To, Cc, Bcc fields) unless it&apos;s the
              sender address itself being analyzed for subscription purposes.
            </li>
            <li>
              Any personal information beyond what is strictly necessary for
              subscription identification and account management.
            </li>
          </ul>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            2. How We Use Your Information
          </h3>
          <p>
            The information we collect is used exclusively for the following
            purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              To identify and display potential email subscriptions within the
              TidyMail application.
            </li>
            <li>
              To enable you to manage these subscriptions (e.g., unsubscribe,
              delete related emails).
            </li>
            <li>To operate, maintain, and improve the TidyMail Service.</li>
            <li>To provide customer support.</li>
            <li>To ensure the security of our Service.</li>
          </ul>
          <p className="mt-2">
            <strong className="text-foreground">
              We do not sell, rent, or share your personal information or
              collected subscription metadata with third parties for marketing
              or advertising purposes.
            </strong>
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            3. Data Security
          </h3>
          <p>
            We implement industry-standard security measures to protect your
            information from unauthorized access, alteration, disclosure, or
            destruction. This includes secure authentication protocols (OAuth),
            encryption of sensitive data both in transit and at rest, and access
            controls.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            4. Data Retention and Deletion
          </h3>
          <p>
            We retain your subscription metadata only as long as necessary to
            provide the Service to you or until you request deletion. You can
            request the deletion of your account and all associated data at any
            time by contacting us at{" "}
            <a href="mailto:kedirjabir12@gmail.com" className="text-blue-600">
              here
            </a>{" "}
            or through the account settings within your dashboard. Upon
            receiving a deletion request, we will permanently delete your data
            from our systems within a reasonable timeframe, subject to any legal
            obligations.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            5. Third-Party Services
          </h3>
          <p>
            We may use third-party services for authentication (e.g., Google
            OAuth, Microsoft OAuth) or analytics (using anonymized data). These
            services have their own privacy policies governing their use of
            information.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            6. Children&apos;s Privacy
          </h3>
          <p>
            Our Service is not intended for use by children under the age of 13.
            We do not knowingly collect personal information from children under
            this age.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            7. Changes to This Privacy Policy
          </h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &ldquo;Last Updated&rdquo; date. You are advised to
            review this Privacy Policy periodically for any changes.
          </p>

          <h3 className="font-semibold text-lg text-foreground pt-4">
            8. Contact Us
          </h3>
          <p>
            If you have any questions about these Terms or the Privacy Policy,
            please contact us at:
            <a href="mailto:kedirjabir12@gmail.com" className="text-blue-600">
              TidyMail Support
            </a>
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Link href="/" className="text-primary hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
