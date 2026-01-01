export function HowItWorks() {
  const steps = [
    {
      title: "Add your PDF",
      desc: "Choose any PDF from your device. Files never leave your browser.",
      num: "1",
    },
    {
      title: "Render pages",
      desc: "We process each page locally using safe, standards-based rendering.",
      num: "2",
    },
    {
      title: "Save images",
      desc: "Export pages individually or all at once. Great for sharing or archives.",
      num: "3",
    },
  ]
  return (
    <div>
      <h3 className="text-balance text-xl font-semibold tracking-tight">How it works</h3>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Simple, predictable steps anyone can follow. No accounts, no uploads, no learning curve.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.num} className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                {s.num}
              </div>
              <h4 className="font-medium">{s.title}</h4>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
