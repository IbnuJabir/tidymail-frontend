import { CheckCircle, Mail, Trash, UserRound } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Email Management</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            TidyMail gives you the tools to take control of your inbox and eliminate email clutter.
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
                Easily view and manage all your subscriptions in one place. Unsubscribe with a single click.
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
                View and manage all your emails in one intuitive interface. Sort, filter, and search with ease.
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
                Powerful tools to clean up your inbox. Move to trash or permanently delete unwanted emails.
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
  )
}
