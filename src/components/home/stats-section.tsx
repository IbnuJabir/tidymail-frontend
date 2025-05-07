export default function StatsSection() {
    return (
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-bold md:text-4xl">35k+</p>
              <p className="text-center text-sm text-muted-foreground">Emails Processed</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-bold md:text-4xl">5k+</p>
              <p className="text-center text-sm text-muted-foreground">Subscriptions Managed</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-bold md:text-4xl">99%</p>
              <p className="text-center text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  