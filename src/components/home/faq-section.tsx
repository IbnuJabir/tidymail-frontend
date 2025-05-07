import FaqAccordion from "@/components/FaqAccordion"

export default function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions about TidyMail? Find answers to common questions below.
          </p>
        </div>

        <FaqAccordion />
      </div>
    </section>
  )
}
