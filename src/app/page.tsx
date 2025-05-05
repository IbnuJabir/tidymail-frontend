"use client";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Star,
  Trash,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useAuth";
import Image from "next/image";
import dashboardImage from "@/assets/dashboard.png";
import FaqAccordion from "@/components/FaqAccordion";
import connectGmail from "@/assets/connectGmail.png";
import analyzeEmail from "@/assets/analyzeEmail.png";
import manageEmail from "@/assets/manageEmail.png";
import bonson from "@/assets/bonson.jpg";
import mensur from "@/assets/mensur.jpg";
import esmael from "@/assets/esmael.jpg";
import { ModeToggle } from "@/components/toogle-theme";

export default function HomePage() {
  const { data: user } = useUser();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TidyMail</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
          {user ? (
            <Link href="/subscriptions">
              <Button variant="outline" className="hidden md:inline-flex">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signup">
                <Button>Sign Up Free</Button>
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 flex flex-col items-center text-center">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Take control of your inbox
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Clean up your inbox with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TidyMail
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Effortlessly manage subscriptions, unsubscribe from unwanted
              emails, and organize your inbox in minutes. Take back control of
              your email experience.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-16 w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={dashboardImage}
                  alt="TidyMail Dashboard"
                  className="h-full w-full object-cover"
                  width={1280}
                  height={680}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {/* <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold md:text-4xl">10k+</p>
                <p className="text-center text-sm text-muted-foreground">
                  Active Users
                </p>
              </div> */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold md:text-4xl">20k+</p>
                <p className="text-center text-sm text-muted-foreground">
                  Emails Processed
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold md:text-4xl">5k+</p>
                <p className="text-center text-sm text-muted-foreground">
                  Subscriptions Managed
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold md:text-4xl">99%</p>
                <p className="text-center text-sm text-muted-foreground">
                  Customer Satisfaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powerful Email Management
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                TidyMail gives you the tools to take control of your inbox and
                eliminate email clutter.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <Card className="border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <UserRound className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Subscription Management</CardTitle>
                  <CardDescription>
                    Easily view and manage all your subscriptions in one place.
                    Unsubscribe with a single click.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>One-click unsubscribe</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Subscription analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Re-subscribe option</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email Organization</CardTitle>
                  <CardDescription>
                    View and manage all your emails in one intuitive interface.
                    Sort, filter, and search with ease.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Advanced filtering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Bulk actions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Smart categorization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Trash className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Cleanup Tools</CardTitle>
                  <CardDescription>
                    Powerful tools to clean up your inbox. Move to trash or
                    permanently delete unwanted emails.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Bulk delete options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Trash management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Restore capabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="bg-muted/30 py-12 sm:py-16 md:py-20"
        >
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
                          Securely connect your email account to TidyMail. We
                          use industry-standard security protocols to ensure
                          your data is protected.
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
                                Securely connect your email provider through
                                OAuth
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
                          src={connectGmail || "/placeholder.svg"}
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
                              <p className="font-medium">
                                Subscription tracking
                              </p>
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
                              <p className="font-medium">
                                One-click unsubscribe
                              </p>
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
                          alt="Connect your email"
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
                          Take control of your inbox with powerful management
                          tools. Unsubscribe, delete, or organize with ease.
                        </p>
                        <ul className="mt-6 space-y-4">
                          <li className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                              1
                            </div>
                            <div>
                              <p className="font-medium">One-click actions</p>
                              <p className="text-sm text-muted-foreground">
                                Unsubscribe, delete, or move emails with a
                                single click
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
                                Track all your unsubscribe and management
                                actions
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="hidden h-full md:block bg-muted p-4 sm:p-4 relative aspect-video w-full overflow-hidden border shadow-sm">
                        <Image
                          src={manageEmail}
                          alt="Connect your email"
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

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of satisfied users who have transformed their
                email experience with TidyMail.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={bonson}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">Bonson Alo</CardTitle>
                      <CardDescription>Software Engineer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;TidyMail has completely transformed how I manage my
                    inbox. I was drowning in promotional emails, and now
                    I&apos;m back in control. The subscription management
                    feature is a game-changer!&rdquo;
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={mensur}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        Mensur Muhammed
                      </CardTitle>
                      <CardDescription>
                        UI/UX and Product Designer
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;As someone who gets hundreds of emails daily,
                    TidyMail has been a lifesaver. The bulk actions and
                    subscription management help me stay organized without
                    spending hours managing my inbox.&rdquo;
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={esmael}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">Esmael Uta</CardTitle>
                      <CardDescription>Data Scientist</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    &ldquo;I was skeptical at first, but TidyMail exceeded my
                    expectations. It&apos;s intuitive, powerful, and has saved
                    me so much time. I can finally focus on emails that matter
                    for my business.&rdquo;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to clean up your inbox?
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Join thousands of users who have transformed their email
                experience with TidyMail. Get started for free today.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Have questions about TidyMail? Find answers to common questions
                below.
              </p>
            </div>

            <FaqAccordion />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">TidyMail</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Take control of your inbox and eliminate email clutter with our
                powerful email management tools.
              </p>
              <div className="mt-4 flex gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-17.3 9.8-2.3-2.1-3.9-4.3-4.6-6.6 2-.2 3.4 0 4.6.7-1.2-.6-2.1-1.5-2.4-2.6 1.6.8 3.1.6 4.5.3C3.9 5.5 2.7 3.8 2.7 2c1.3.7 2.6 1 3.8 1.1-1.4-1-2.4-2.3-2.4-4 .9.5 1.8 1 2.8 1.4C4.1 1.8 7.7.8 11 3c4.7-2.4 8.1 3.6 8.1 3.6 1.7-.5 2.4-1.6 2.9-2.6z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} TidyMail. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
