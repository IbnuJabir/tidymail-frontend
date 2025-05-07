import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import connectGmail from "@/assets/connectGmail.png";
import analyzeEmail from "@/assets/analyzeEmail.png";
import manageEmail from "@/assets/manageEmail.png";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How TidyMail Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in minutes and take control of your inbox with these
            simple steps.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <Tabs defaultValue="connect" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connect">1. Connect</TabsTrigger>
              <TabsTrigger value="analyze">2. Analyze</TabsTrigger>
              <TabsTrigger value="manage">3. Manage</TabsTrigger>
            </TabsList>
            <div className="mt-8 overflow-hidden rounded-xl border bg-background">
              <TabsContent value="connect" className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Connect Your Email
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Securely connect your email account to TidyMail. We use
                      industry-standard security protocols to ensure your data
                      is protected.
                    </p>
                    <ul className="mt-6 space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Create an account</p>
                          <p className="text-sm text-muted-foreground">
                            Sign up for TidyMail with your google account
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Authorize access</p>
                          <p className="text-sm text-muted-foreground">
                            Securely connect your email provider through OAuth
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Start onboarding</p>
                          <p className="text-sm text-muted-foreground">
                            After connecting, you&apos;ll be guided through
                            onboarding to customize your experience.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="hidden h-full md:block bg-muted p-4 sm:p-4 relative aspect-video w-full overflow-hidden border shadow-sm">
                    <Image
                      src={connectGmail}
                      alt="Connect your email"
                      className="h-full w-full object-fill rounded-lg border"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analyze" className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Analyze Your Inbox
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      TidyMail scans your inbox to identify subscriptions,
                      newsletters, and promotional emails.
                    </p>
                    <ul className="mt-6 space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Smart scanning</p>
                          <p className="text-sm text-muted-foreground">
                            Our algorithm identifies subscription patterns
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Subscription tracking</p>
                          <p className="text-sm text-muted-foreground">
                            View all your subscriptions in one convenient
                            dashboard
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          3
                        </div>
                        <div>
                          <p className="font-medium">One-click unsubscribe</p>
                          <p className="text-sm text-muted-foreground">
                            Easily manage and remove unwanted subscriptions
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="hidden h-full md:block bg-muted p-4 sm:p-4 relative aspect-video w-full overflow-hidden border shadow-sm">
                    <Image
                      src={analyzeEmail}
                      alt="Analyze your inbox"
                      className="h-full w-full object-fill rounded-lg border"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manage" className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Manage Everything
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Take control of your inbox with powerful management tools.
                      Unsubscribe, delete, or organize with ease.
                    </p>
                    <ul className="mt-6 space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          1
                        </div>
                        <div>
                          <p className="font-medium">One-click actions</p>
                          <p className="text-sm text-muted-foreground">
                            Unsubscribe, delete, or move emails with a single
                            click
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Bulk operations</p>
                          <p className="text-sm text-muted-foreground">
                            Perform actions on multiple emails at once
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Activity history</p>
                          <p className="text-sm text-muted-foreground">
                            Track all your unsubscribe and management actions
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="hidden h-full md:block bg-muted p-4 sm:p-4 relative aspect-video w-full overflow-hidden border shadow-sm">
                    <Image
                      src={manageEmail}
                      alt="Manage your emails"
                      className="h-full w-full object-fill rounded-lg border"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
