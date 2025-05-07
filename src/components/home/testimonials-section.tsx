import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import bonson from "@/assets/bonson.jpg";
import mensur from "@/assets/mensur.jpg";
import esmael from "@/assets/esmael.jpg";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of satisfied users who have transformed their email experience with TidyMail.
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
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">
                &ldquo;TidyMail has completely transformed how I manage my inbox. I was drowning in promotional emails,
                and now I&apos;m back in control. The subscription management feature is a game-changer!&rdquo;
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
                  <CardTitle className="text-base">Mensur Muhammed</CardTitle>
                  <CardDescription>UI/UX and Product Designer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">
                &ldquo;As someone who gets hundreds of emails daily, TidyMail has been a lifesaver. The bulk actions and
                subscription management help me stay organized without spending hours managing my inbox.&rdquo;
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
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">
                &ldquo;I was skeptical at first, but TidyMail exceeded my expectations. It&apos;s intuitive, powerful,
                and has saved me so much time. I can finally focus on emails that matter for my business.&rdquo;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
