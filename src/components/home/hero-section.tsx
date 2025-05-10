import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import dashboard from "@/assets/dashboard.png";

export default function HeroSection() {
  return (
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
          Effortlessly manage subscriptions, unsubscribe from unwanted emails,
          and organize your inbox in minutes. Take back control of your email
          experience.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/login">
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
          <div className="relative w-[85%] overflow-hidden bg-muted">
            <Image
              src={dashboard}
              alt="TidyMail Dashboard"
              className="h-full w-full object-contain"
              width={1280}
              height={680}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent dark:from-background/70" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
}
