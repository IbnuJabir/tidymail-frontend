import { Shield, Users, Zap } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About TidyMail
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're on a mission to help people regain control of their inboxes
            and reduce digital clutter.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-6">Our Story</h3>
            <p className="text-muted-foreground mb-6">
              TidyMail was born out of frustration with overflowing inboxes and
              the time wasted sorting through unwanted emails. Our founders
              experienced firsthand how email overload can impact productivity
              and mental clarity.
            </p>
            <p className="text-muted-foreground mb-6">
              We built TidyMail to solve this universal problem with a simple,
              powerful tool that helps users quickly identify, manage, and
              eliminate unwanted subscriptions while organizing their important
              communications.
            </p>
            <p className="text-muted-foreground mb-10">
              Today, TidyMail is helping Multiple users around the world reclaim
              their time and attention by streamlining their email experience.
              Our team is dedicated to continuous improvement and innovation,
              ensuring that TidyMail remains the most effective solution for
              email management.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  User-Centered Design
                </h4>
                <p className="text-muted-foreground">
                  We build our products with real users in mind, focusing on
                  intuitive interfaces and meaningful features.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Privacy First</h4>
                <p className="text-muted-foreground">
                  Your data is never sold, your password is never stored, and
                  email content is never retained. We follow top-tier security
                  practices to protect your information.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Continuous Innovation
                </h4>
                <p className="text-muted-foreground">
                  We're constantly improving our platform based on user feedback
                  and emerging technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
